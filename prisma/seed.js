import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //site main table
  const chinaGarden = await prisma.siteMain.upsert({
    where: { id: 1 },
    update: {},
    create: {
      siteName: "china garden",
      phone: "2162263434",
    },
  });
  console.log(chinaGarden);
  //role table
  const user = await prisma.role.upsert({
    where: { role: "user" },
    update: {},
    create: {
      role: "user",
    },
  });
  const admin = await prisma.role.upsert({
    where: { role: "admin" },
    update: {},
    create: {
      role: "admin",
    },
  });
  const developer = await prisma.role.upsert({
    where: { role: "developer" },
    update: {},
    create: {
      role: "developer",
    },
  });
  console.log(user, admin, developer);
  //user table
  const jake = await prisma.user.upsert({
    where: { email: "jakeH@gmail.com" },
    update: {},
    create: {
      username: "jakeH",
      password: "1234",
      email: "jakeH@gmail.com",
      firstName: "jake",
      lastName: "huang",
      userRole: { connect: { role: "user" } },
      address: {
        create: {
          address1: "1234 fry ave",
          city: "cleveland",
          state: "ohio",
          zipCode: "44107",
        },
      },
    },
  });
  const kai = await prisma.user.upsert({
    where: { email: "kaiH@gmail.com" },
    update: {},
    create: {
      username: "kaiH",
      password: "1234",
      email: "kaiH@gmail.com",
      firstName: "kai",
      lastName: "huang",
      userRole: { connect: { role: "admin" } },
      address: {
        create: {
          address1: "4321 fry ave",
          city: "cleveland",
          state: "ohio",
          zipCode: "44107",
        },
      },
    },
  });
  const jay = await prisma.user.upsert({
    where: { email: "jayH@gmail.com" },
    update: {},
    create: {
      username: "jayH",
      password: "1234",
      email: "jayH@gmail.com",
      firstName: "jay",
      lastName: "huang",
      userRole: { connect: { role: "developer" } },
      address: {
        create: {
          address1: "3456 fry ave",
          city: "cleveland",
          state: "ohio",
          zipCode: "44107",
        },
      },
    },
  });
  console.log(jake, kai, jay);
  //category table
  const appetizer = await prisma.category.upsert({
    where: { categoryName: "appetizer" },
    update: {},
    create: {
      categoryName: "appetizer",
    },
  });
  const beef = await prisma.category.upsert({
    where: { categoryName: "beef" },
    update: {},
    create: {
      categoryName: "beef",
    },
  });
  const chicken = await prisma.category.upsert({
    where: { categoryName: "chicken" },
    update: {},
    create: {
      categoryName: "chicken",
    },
  });
  console.log(appetizer, beef, chicken);
  //option table
  const base = await prisma.option.upsert({
    where: { optionName: "base" },
    update: {},
    create: {
      optionName: "base",
    },
  });
  const small = await prisma.option.upsert({
    where: { optionName: "small" },
    update: {},
    create: {
      optionName: "small",
    },
  });
  const large = await prisma.option.upsert({
    where: { optionName: "large" },
    update: {},
    create: {
      optionName: "large",
    },
  });
  const dinner = await prisma.option.upsert({
    where: { optionName: "dinner" },
    update: {},
    create: {
      optionName: "dinner",
      description: "dinner comes with rice and egg roll",
    },
  });
  console.log(base, small, large, dinner);
  //ingredient type table
  //ingredient table
  const vegetable = await prisma.ingredientType.upsert({
    where: { ingredientTypeName: "vegetable" },
    update: {},
    create: {
      ingredientTypeName: "vegetable",
      ingredients: {
        create: [
          { ingredientName: "broccoli" },
          { ingredientName: "cabbage" },
          { ingredientName: "carrot" },
          { ingredientName: "pepper" },
          { ingredientName: "onion" },
          { ingredientName: "mushroom" },
          { ingredientName: "Chinese cabbage" },
          { ingredientName: "sesame" },
        ],
      },
    },
  });
  const meat = await prisma.ingredientType.upsert({
    where: { ingredientTypeName: "meat" },
    update: {},
    create: {
      ingredientTypeName: "meat",
      ingredients: {
        create: [
          { ingredientName: "pork" },
          { ingredientName: "chicken" },
          { ingredientName: "beef" },
        ],
      },
    },
  });
  const sauce = await prisma.ingredientType.upsert({
    where: { ingredientTypeName: "sauce" },
    update: {},
    create: {
      ingredientTypeName: "sauce",
      ingredients: {
        create: [
          { ingredientName: "brown sauce" },
          { ingredientName: "white sauce" },
          { ingredientName: "general tso sauce" },
          { ingredientName: "orange sauce" },
          { ingredientName: "sesame sauce" },
        ],
      },
    },
  });
  console.log(vegetable, meat, sauce);
  //item table
  //item ingredient
  const eggRoll = await prisma.item.upsert({
    where: { itemName: "egg roll" },
    update: {},
    create: {
      itemName: "egg roll",
      ingredients: {
        create: [
          {
            ingredient: {
              connect: { ingredientName: "cabbage" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "pork" },
            },
          },
        ],
      },
      options: {
        create: [
          {
            option: {
              connect: { optionName: "base" },
            },
            price: 100,
          },
        ],
      },
      itemCategory: {
        connect: { categoryName: "appetizer" },
      },
    },
  });
  const springRoll = await prisma.item.upsert({
    where: { itemName: "spring roll" },
    update: {},
    create: {
      itemName: "spring roll",
      ingredients: {
        create: [
          {
            ingredient: {
              connect: { ingredientName: "cabbage" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "carrot" },
            },
          },
        ],
      },
      options: {
        create: [
          {
            option: {
              connect: { optionName: "base" },
            },
            price: 150,
          },
        ],
      },
      itemCategory: {
        connect: { categoryName: "appetizer" },
      },
    },
  });
  const chickenWing = await prisma.item.upsert({
    where: { itemName: "fried chicken wing" },
    update: {},
    create: {
      itemName: "fried chicken wing",
      ingredients: {
        create: {
          ingredient: {
            connect: { ingredientName: "chicken" },
          },
        },
      },
      options: {
        create: [
          {
            option: {
              connect: { optionName: "base" },
            },
            price: 500,
          },
        ],
      },
      itemCategory: {
        connect: { categoryName: "appetizer" },
      },
    },
  });
  console.log(eggRoll, springRoll, chickenWing);
  const chickenBroccoli = await prisma.item.upsert({
    where: { itemName: "chicken with broccoli" },
    update: {},
    create: {
      itemName: "chicken with broccoli",
      ingredients: {
        create: [
          {
            ingredient: {
              connect: { ingredientName: "chicken" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "broccoli" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "carrot" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "brown sauce" },
            },
          },
        ],
      },
      options: {
        create: [
          {
            option: {
              connect: { optionName: "small" },
            },
            price: 700,
          },
          {
            option: {
              connect: { optionName: "large" },
            },
            price: 1050,
          },
          {
            option: {
              connect: { optionName: "dinner" },
            },
            price: 1000,
          },
        ],
      },
      itemCategory: {
        connect: { categoryName: "chicken" },
      },
    },
  });
    const generalChicken = await prisma.item.upsert({
      where: { itemName: "general tso's chicken" },
      update: {},
      create: {
        itemName: "general tso's chicken",
        ingredients: {
          create: [
            {
              ingredient: {
                connect: { ingredientName: "chicken" },
              },
            },
            {
              ingredient: {
                connect: { ingredientName: "broccoli" },
              },
            },
            {
              ingredient: {
                connect: { ingredientName: "general tso sauce" },
              },
            },
          ],
        },
        options: {
          create: [
            {
              option: {
                connect: { optionName: "large" },
              },
              price: 1150,
            },
            {
              option: {
                connect: { optionName: "dinner" },
              },
              price: 1000,
            },
          ],
        },
        itemCategory: {
          connect: { categoryName: "chicken" },
        },
      },
    });
  const orangeChicken = await prisma.item.upsert({
    where: { itemName: "orange chicken" },
    update: {},
    create: {
      itemName: "orange chicken",
      ingredients: {
        create: [
          {
            ingredient: {
              connect: { ingredientName: "chicken" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "broccoli" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "orange sauce" },
            },
          },
        ],
      },
      options: {
        create: [
          {
            option: {
              connect: { optionName: "large" },
            },
            price: 1150,
          },
          {
            option: {
              connect: { optionName: "dinner" },
            },
            price: 1000,
          },
        ],
      },
      itemCategory: {
        connect: { categoryName: "chicken" },
      },
    },
  });
  const sesameChicken = await prisma.item.upsert({
    where: { itemName: "sesame chicken" },
    update: {},
    create: {
      itemName: "sesame chicken",
      ingredients: {
        create: [
          {
            ingredient: {
              connect: { ingredientName: "chicken" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "broccoli" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "sesame sauce" },
            },
          },
        ],
      },
      options: {
        create: [
          {
            option: {
              connect: { optionName: "large" },
            },
            price: 1150,
          },
          {
            option: {
              connect: { optionName: "dinner" },
            },
            price: 1000,
          },
        ],
      },
      itemCategory: {
        connect: { categoryName: "chicken" },
      },
    },
  });
  console.log(chickenBroccoli, generalChicken, orangeChicken, sesameChicken);
  const beefBroccoli = await prisma.item.upsert({
    where: { itemName: "beef with broccoli" },
    update: {},
    create: {
      itemName: "beef with broccoli",
      ingredients: {
        create: [
          {
            ingredient: {
              connect: { ingredientName: "beef" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "broccoli" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "carrot" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "brown sauce" },
            },
          },
        ],
      },
      options: {
        create: [
          {
            option: {
              connect: { optionName: "small" },
            },
            price: 800,
          },
          {
            option: {
              connect: { optionName: "large" },
            },
            price: 1150,
          },
          {
            option: {
              connect: { optionName: "dinner" },
            },
            price: 1000,
          },
        ],
      },
      itemCategory: {
        connect: { categoryName: "beef" },
      },
    },
  });
  const pepperSteak = await prisma.item.upsert({
    where: { itemName: "pepper steak with onion" },
    update: {},
    create: {
      itemName: "pepper steak with onion",
      ingredients: {
        create: [
          {
            ingredient: {
              connect: { ingredientName: "beef" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "pepper" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "onion" },
            },
          },
          {
            ingredient: {
              connect: { ingredientName: "brown sauce" },
            },
          },
        ],
      },
      options: {
        create: [
          {
            option: {
              connect: { optionName: "small" },
            },
            price: 800,
          },
          {
            option: {
              connect: { optionName: "large" },
            },
            price: 1150,
          },
          {
            option: {
              connect: { optionName: "dinner" },
            },
            price: 1000,
          },
        ],
      },
      itemCategory: {
        connect: { categoryName: "beef" },
      },
    },
  });
  console.log(beefBroccoli, pepperSteak);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
