import { Money } from "#lib/payments/money.js";
import Event from "#models/event";
import ProductGroup from "#models/product_group";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

export default class extends BaseSeeder {
  async run() {
    const rallyTascasEvent = await Event.findOrFail(47);

    const rallyTascasGroup = await ProductGroup.create({
      name: "Rally tascas",
      maxAmountPerGroup: 1,
    });

    await rallyTascasGroup.related("products").create({
      name: "Rally Tascas",
      description:
        "Rally Tascas é um jogo de rally que se passa em um mundo de aventuras e desafios. Você é um atleta de rally que deve encontrar a maneira de superar as dificuldades e desafios que surgem ao seu caminho. Com o jogo, você pode se aventurar em diferentes situações e desafios, desde a montanha até a praia, e se preparar para enfrentar os desafios mais difíceis.",
      price: Money.fromCents(500),
      stock: 70,
      maxOrder: 1,
      image: "https://www.enei.com.br/wp-content/uploads/2023/03/Rally-Tascas-1.jpg",
    });

    rallyTascasEvent.productGroupId = rallyTascasGroup.id;
    await rallyTascasEvent.save();
  }
}
