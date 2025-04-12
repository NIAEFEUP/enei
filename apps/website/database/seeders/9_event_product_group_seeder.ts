import Event from "#models/event";
import Product from "#models/product";
import ProductGroup from "#models/product_group";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

export default class extends BaseSeeder {
  async run() {
    const rallyTascasEvent = await Event.findOrFail(48);

    const rallyTascasGroup = await ProductGroup.create({
      name: "Rally tascas",
      maxAmountPerGroup: 1,
    });

    await rallyTascasGroup.related("products").create({
      name: "Rally Tascas",
      description:
        "Rally Tascas é um jogo de rally que se passa em um mundo de aventuras e desafios. Você é um atleta de rally que deve encontrar a maneira de superar as dificuldades e desafios que surgem ao seu caminho. Com o jogo, você pode se aventurar em diferentes situações e desafios, desde a montanha até a praia, e se preparar para enfrentar os desafios mais difíceis.",
      price: 500,
      stock: 70,
      maxOrder: 1,
    });

    rallyTascasEvent.productGroupId = rallyTascasGroup.id;
    await rallyTascasEvent.save();

    const p1 = await Product.create({
      name: "Competição de Pitches",
      description: "Participação na Competição de Pitches",
      points: 2500,
      stock: 100,
      maxOrder: 1,
      image: "pitch_competition.jpg",
      hidden: false,
      productGroupId: 1,
      restrictions: null,
    });
    const event1 = await Event.findOrFail(50);
    event1.productId = p1.id;
    await event1.save();

    const p2 = await Product.create({
      name: "Competição de Programação",
      description: "Participação na Competição de Programação",
      points: 2500,
      stock: 100,
      maxOrder: 1,
      image: "programming_competition.jpg",
      hidden: false,
      productGroupId: 1,
      restrictions: null,
    });
    const event2 = await Event.findOrFail(46);
    event2.productId = p2.id;
    await event2.save();

    const p3 = await Product.create({
      name: "Workshops",
      description: "Acesso a workshops durante o evento",
      points: 2000,
      stock: 100,
      maxOrder: 1,
      image: "workshops.jpg",
      hidden: false,
      productGroupId: 1,
      restrictions: null,
    });
    const event3 = await Event.query().where("type", "workshop");
    for (const e of event3) {
      e.productId = p3.id;
      await e.save();
    }

    const p4 = await Product.create({
      name: "ENEIGMA",
      description: "Participação no ENEIGMA",
      points: 1500,
      stock: 100,
      maxOrder: 1,
      image: "eneigma.jpg",
      hidden: false,
      productGroupId: 1,
      restrictions: null,
    });
    const event4 = await Event.findOrFail(49);
    event4.productId = p4.id;
    await event4.save();
  }
}
