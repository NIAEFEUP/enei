import User from "#models/user";
import { args, BaseCommand, flags } from "@adonisjs/core/ace";
import type { CommandOptions } from "@adonisjs/core/types/ace";
import htmlToPdf from "html-pdf-node-ts";
import { createTuyau } from "@tuyau/client";
import fsp from "node:fs/promises";
import { join } from "node:path";
import Company from "#models/company";
import { UserActivityService } from "#services/user_activity_service";
import EventCheckin from "#models/event_checkin";
import * as csv from "csv";
import universities from "#data/enei/universities.json" with { type: "json" };
import * as zipFolder from "zip-a-folder";

type GeneratePdfParameters = Parameters<typeof htmlToPdf.generatePdf>;
function generatePdf(...fnArgs: [GeneratePdfParameters[0], GeneratePdfParameters[1]]) {
  return htmlToPdf.generatePdf(...fnArgs);
}

function createWorkerPool(size: number) {
  const workers: Promise<void>[] = [];
  for (let i = 0; i < size; i++) {
    workers.push(Promise.resolve());
  }

  let index = 0;
  return {
    async wait() {
      console.log("Waiting for workers to finish...");
      await Promise.all(workers);
    },
    run(fn: () => Promise<void>) {
      const currentTask = workers[index];
      const nextTask = currentTask.then(() => fn());
      workers[index] = nextTask;
      index = (index + 1) % workers.length;

      return nextTask;
    },
    runTrying(tries: number, fn: () => Promise<void>) {
      return this.run(async () => {
        let triesLeft = tries;

        while (true) {
          try {
            return await fn();
          } catch (error) {
            triesLeft--;
            console.log("Tries left", triesLeft);
            if (triesLeft <= 0) {
              throw error;
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      });
    },
  };
}

function getUniversityName(university: string) {
  return universities.find((u) => u.id === university)?.name;
}

export default class EneiCreateCompanyExport extends BaseCommand {
  static commandName = "enei:create-company-export";
  static description = "";

  static options: CommandOptions = {
    startApp: true,
  };

  @args.spread({
    description: "The names of the companies to create the exports for",
    required: true,
  })
  declare companies: string[];

  @flags.boolean({
    description: "Whether to export information for all participants",
    default: false,
  })
  declare all: boolean;

  @flags.boolean({
    description: "Whether to export information for the participants who visited the company",
    default: false,
  })
  declare visited: boolean;

  @flags.boolean({
    description:
      "Whether to export information for the participants that the company's representatives liked",
    default: false,
  })
  declare liked: boolean;

  @flags.string({
    description: "The location to save the export to",
    required: false,
    default: "./export",
  })
  declare output: string;

  async loadUserCache(path: string) {
    try {
      const cache = JSON.parse(await fsp.readFile(path, "utf-8")) as [string, number][];
      return new Map<string, number>(cache);
    } catch (error) {
      return new Map<string, number>();
    }
  }

  async saveUserCache(path: string, cache: Map<string, number>) {
    const cacheArray = Array.from(cache.entries());
    await fsp.writeFile(path, JSON.stringify(cacheArray));
  }

  async createCvDownloader(baseDir: string) {
    const cachePath = join(baseDir, "_cv.cache.json");
    const cache = await this.loadUserCache(cachePath);

    const resumePool = createWorkerPool(1);

    async function downloadCv(user: User) {
      const slug = user.slug;
      const resume = user.resume;
      if (!slug || !resume) {
        return;
      }

      const lastUpdated = user.updatedAt.toMillis();
      const cachedLastUpdated = cache.get(slug);

      if (cachedLastUpdated && lastUpdated <= cachedLastUpdated) {
        // console.log("Skipping CV download for", slug, "because it's already up to date");
        return;
      }

      console.log("Downloading CV for", slug);

      const resumeUrl = await resume.getSignedUrl();
      const response = await fetch(resumeUrl);

      const blob = await response.blob();
      const path = join(baseDir, `${slug}-cv.pdf`);
      await fsp.writeFile(path, blob.stream());

      cache.set(slug, lastUpdated);
    }

    return {
      download(...fnArgs: Parameters<typeof downloadCv>) {
        void resumePool
          .runTrying(3, () => downloadCv(...fnArgs))
          .catch((err) => {
            console.error(`Got error while downloading CV for ${fnArgs[0].slug}`);
            console.error(err);
          });
      },
      close: async () => {
        await resumePool.wait();
        await this.saveUserCache(cachePath, cache);
      },
    };
  }

  async createProfileDownloader(baseDir: string) {
    const cachePath = join(baseDir, "_profile.cache.json");
    const cache = await this.loadUserCache(cachePath);

    const api = () => import("#.adonisjs/api").then((m) => m.api);
    const tuyau = createTuyau({
      baseUrl: "https://eneiconf.pt",
      api: await api(),
    });

    const profilePool = createWorkerPool(8);

    async function downloadProfile(user: User) {
      const slug = user.slug;
      if (!slug) {
        return;
      }

      const userLastUpdated = user.updatedAt.toMillis();
      const participantProfileLastUpdated =
        user.participantProfileId && user.participantProfile.updatedAt.toMillis();
      const staffProfileLastUpdated = user.staffProfileId && user.staffProfile.updatedAt.toMillis();

      const lastUpdated = Math.max(
        ...[userLastUpdated, participantProfileLastUpdated, staffProfileLastUpdated].filter(
          (v): v is NonNullable<typeof v> => !!v,
        ),
      );

      const cachedLastUpdated = cache.get(slug);

      if (cachedLastUpdated && lastUpdated <= cachedLastUpdated) {
        // console.log("Skipping profile download for", slug, "because it's already up to date");
        return;
      }

      console.log("Downloading profile for", slug);

      const profileUrl = tuyau.u({ slug }).$url();
      const pdf = await generatePdf(
        { url: profileUrl },
        { format: "A4", landscape: true, printBackground: true, preferCSSPageSize: true, scale: 0.9 },
      );

      const path = join(baseDir, `${slug}-profile.pdf`);
      await fsp.writeFile(path, pdf);

      cache.set(slug, lastUpdated);
    }

    return {
      download(...fnArgs: Parameters<typeof downloadProfile>) {
        void profilePool
          .runTrying(3, () => downloadProfile(...fnArgs))
          .catch((err) => {
            console.error(`Got error while downloading profile for ${fnArgs[0].slug}`);
            console.error(err);
          });
      },
      close: async () => {
        await profilePool.wait();
        await this.saveUserCache(cachePath, cache);
      },
    };
  }

  getParticipants() {
    return User.query()
      .preload("participantProfile")
      .preload("staffProfile")
      .whereIn("participant_profile_id", (query) => {
        return query.select("id").from("participant_profiles").whereNotNull("purchased_ticket");
      });
  }

  async getVisitingParticipants(companyName: string) {
    const company = await Company.findByOrFail("name", companyName);
    await company.loadOnce("event");

    if (!company.event) {
      return [];
    }

    let baseQuery = this.getParticipants().whereIn("id", (query) => {
      return query.select("user_id").from("event_checkins").where("event_id", company.event.id);
    });

    return baseQuery;
  }

  async getLikedParticipants(companyName: string) {
    const company = await Company.findByOrFail("name", companyName);

    let baseQuery = this.getParticipants().whereIn("id", (query) => {
      return query
        .select("user_id")
        .from("user_activities")
        .where("type", "company_like")
        .andWhereRaw(`description->>'companyId' = ?`, [company.id]);
    });

    return baseQuery;
  }

  async syncCache(cacheDir: string) {
    const participants = await this.getParticipants();

    await fsp.mkdir(cacheDir, { recursive: true });

    const cvs = await this.createCvDownloader(cacheDir);
    const profiles = await this.createProfileDownloader(cacheDir);

    for (const participant of participants) {
      if (!participant.slug) {
        console.log(`Skipping ${participant.email} because they don't have a slug`);
        continue;
      }

      cvs.download(participant);
      profiles.download(participant);
    }

    await Promise.all([
      cvs.close().then(() => console.log("> All CVs have been downloaded")),
      profiles.close().then(() => console.log("> All profiles have been downloaded")),
    ]);
  }

  async run() {
    const userActivityService = await this.app.container.make(UserActivityService);

    const cacheDir = this.app.tmpPath("export", ".cache");
    await this.syncCache(cacheDir);

    async function copyParticipantFiles(participant: User, destFolder: string) {
      const slug = participant.slug;
      if (!slug) {
        return;
      }

      const fromCv = join(cacheDir, `${slug}-cv.pdf`);
      const fromProfile = join(cacheDir, `${slug}-profile.pdf`);

      const userPath = `${participant.participantProfile.firstName.trim()} ${participant.participantProfile.lastName.trim()} (${slug})`;

      const toNameFolder = join(destFolder, "by-name", userPath);
      await fsp.mkdir(toNameFolder, { recursive: true });

      const toNameCv = join(toNameFolder, "cv.pdf");
      const toNameProfile = join(toNameFolder, "profile.pdf");

      const toCvTypeFolder = join(destFolder, "by-type", "cv");
      await fsp.mkdir(toCvTypeFolder, { recursive: true });

      const toProfileTypeFolder = join(destFolder, "by-type", "profile");
      await fsp.mkdir(toProfileTypeFolder, { recursive: true });

      const toTypeCv = join(toCvTypeFolder, `${userPath}.pdf`);
      const toTypeProfile = join(toProfileTypeFolder, `${userPath}.pdf`);

      const [cv, profile] = await Promise.all([
        fsp
          .copyFile(fromCv, toNameCv)
          .then(() => toNameCv)
          .catch(() => undefined),
        fsp
          .copyFile(fromProfile, toNameProfile)
          .then(() => toNameProfile)
          .catch(() => undefined),
        fsp
          .copyFile(fromCv, toTypeCv)
          .then(() => toTypeCv)
          .catch(() => undefined),
        fsp
          .copyFile(fromProfile, toTypeProfile)
          .then(() => toTypeProfile)
          .catch(() => undefined),
      ]);

      return { cv, profile };
    }

    async function writeParticipantsInformation(
      participants: User[],
      company: Company,
      destFolder: string,
    ) {
      await company.loadOnce("event");

      async function getLikes(participant: User) {
        const likes = await userActivityService.getCompanyLikes(participant.id, company.id);
        const names = await Promise.all(
          likes.map(async (user) => {
            if (!user.representativeProfileId) {
              return null;
            }

            await user.load("representativeProfile");
            return user.representativeProfile.firstName + " " + user.representativeProfile.lastName;
          }),
        );

        return names.filter((name) => name !== null);
      }

      async function getCheckin(participant: User) {
        const checkin = await EventCheckin.findBy({
          userId: participant.id,
          eventId: company.event.id,
        });

        if (!checkin) {
          return null;
        }

        return checkin.checkedInAt;
      }

      const information = await Promise.all(
        participants.map(async (participant) => {
          if (!participant.slug) {
            return null;
          }

          const [likes, checkin] = await Promise.all([
            getLikes(participant),
            getCheckin(participant),
          ]);

          return {
            "ID": participant.slug,
            "Primeiro Nome": participant.participantProfile.firstName.trim(),
            "Último Nome": participant.participantProfile.lastName.trim(),
            "Email": participant.email,
            "É staff do ENEI?": participant.isStaff() ? "True" : "False",

            "Universidade": getUniversityName(participant.participantProfile.university),
            "Curso": participant.participantProfile.course,
            "Ano Curricular":
              participant.participantProfile.curricularYear === "already-finished"
                ? `Concluído`
                : participant.participantProfile.curricularYear,
            "Ano de Conclusão": participant.participantProfile.finishedAt,

            "Sobre": participant.participantProfile.about,
            "Link Github": participant.participantProfile.github,
            "Link LinkedIn": participant.participantProfile.linkedin,
            "Link Website": participant.participantProfile.website,

            "Hora da Visita à Banca": checkin?.setZone("Europe/Lisbon").toHTTP() ?? null,
            "Likes de Representantes": likes.join(", "),
          };
        }),
      );

      const validInformation = information.filter((info) => info !== null);
      if (validInformation.length === 0) {
        return;
      }

      const filePath = join(destFolder, "participants.csv");
      await fsp.writeFile(filePath, csv.stringify(validInformation, { header: true }));
    }

    for (const companyName of this.companies) {
      const companyDir = this.app.tmpPath("export", companyName);
      await fsp.rm(companyDir, { recursive: true, force: true });
      await fsp.mkdir(companyDir, { recursive: true });

      const sets = [
        this.all && { name: "all", participants: await this.getParticipants() },
        this.visited && {
          name: "visited",
          participants: await this.getVisitingParticipants(companyName),
        },
        this.liked && { name: "liked", participants: await this.getLikedParticipants(companyName) },
      ];

      for (const set of sets) {
        if (!set) continue;

        const { name, participants } = set;
        const setPath = join(companyDir, name);
        await fsp.mkdir(setPath, { recursive: true });

        for (const participant of participants) {
          await copyParticipantFiles(participant, setPath);
        }

        const company = await Company.findByOrFail("name", companyName);
        await writeParticipantsInformation(participants, company, setPath);
      }

      const result = await zipFolder.zip(companyDir, this.output, { compression: zipFolder.COMPRESSION_LEVEL.high });
      if (result) {
        throw result;
      }

      console.log(`Successfully zipped ${companyDir} to ${this.output}`);
    }
  }
}
