import type SpeakerProfile from "#models/speaker_profile";

export class SpeakerProfileDto {
  constructor(private speakerProfile: SpeakerProfile) {}

  toJSON() {
    return {
      id: this.speakerProfile.id,
      createdAt: this.speakerProfile.createdAt.toISO(),
      updatedAt: this.speakerProfile.updatedAt.toISO(),
      firstName: this.speakerProfile.firstName,
      lastName: this.speakerProfile.lastName,
      jobTitle: this.speakerProfile.jobTitle,
      profilePicture: this.speakerProfile.profilePicture,
      company: this.speakerProfile.company,
      slug: this.speakerProfile.user?.slug,
    };
  }
}
