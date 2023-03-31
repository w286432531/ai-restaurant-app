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
      menuVersion:10
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
      description:
        "An egg roll is a savory Chinese dish that consists of a crispy, fried wrapper filled with a variety of chopped vegetables such as cabbage, carrots, and bean sprouts, as well as ground meat such as pork or chicken. The filling is seasoned with a blend of spices and soy sauce, giving the egg roll its distinct flavor. Egg rolls are a popular appetizer in Chinese cuisine and are often served alongside sweet and sour sauce or hot mustard for dipping.",
      imageUrl:
        "https://drive.google.com/uc?export=view&id=1-PNeLyOWtZ98ewFTJWX_YjHy7UTtckSX",
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
      description:
        "A fried spring roll is a delicious and crispy Chinese appetizer that consists of a thin pastry wrapper filled with a variety of ingredients such as shredded vegetables, bean sprouts, and sometimes meat or seafood. The filling is typically seasoned with spices and soy sauce for added flavor. The spring roll is then deep-fried until golden and crispy, giving it a satisfying crunch. Fried spring rolls are commonly served as an appetizer or snack in Chinese cuisine and are often enjoyed with a dipping sauce such as sweet and sour or chili sauce.",
      imageUrl:"https://drive.google.com/uc?export=view&id=1-6NIF3Of_cP7kM957l-h2xym87x2_w7l",
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
      description:
        "Fried chicken wings are a classic Chinese dish that are known for their crispy and flavorful coating. The wings are typically seasoned with a blend of spices and herbs, then coated in a batter made from flour and cornstarch before being deep-fried until golden and crispy. The result is a deliciously crunchy exterior that gives way to juicy and tender meat inside. Fried chicken wings are often served as an appetizer or snack in Chinese cuisine and can be enjoyed plain or with a variety of sauces, such as sweet and sour, honey mustard, or spicy chili.",
      imageUrl:
        "https://drive.google.com/uc?export=view&id=1-OsWSy19_QD5NnyZYtgyLSe1Eg96mFsF",
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
      description:
        "Chicken and broccoli is a classic Chinese dish that is loved for its simplicity and delicious flavor. The dish typically consists of tender pieces of chicken that are stir-fried with fresh broccoli florets and a savory sauce made from a blend of soy sauce, garlic, and ginger. The result is a deliciously fragrant and satisfying meal that is both nutritious and flavorful. Chicken and broccoli is a popular choice for those looking for a healthier option in Chinese cuisine, as it is low in calories and high in protein and fiber. It is often served over a bed of steaming white rice for a filling and satisfying meal.",
      imageUrl:
        "https://drive.google.com/uc?export=view&id=1-52fS19zB-aYnN2M1dN6JQUHQ26YRgem",
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
      description:
        "General Tso's chicken is a beloved Chinese dish that is known for its spicy and sweet flavor. The dish consists of tender pieces of chicken that are first battered and then deep-fried until crispy. The chicken is then tossed in a savory sauce made from a blend of soy sauce, vinegar, sugar, and chili flakes, which gives it its signature sweet and spicy taste. General Tso's chicken is typically served over a bed of steaming white rice and is a popular choice for those looking for a delicious and satisfying meal. It is a perfect balance of sweet and savory flavors with a touch of heat that is sure to please any palate.",
      imageUrl:
        "https://drive.google.com/uc?export=view&id=1-HnnLg9nUc0lOrd2G5dyIN0pDme5sgU3",
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
      description:
        "Orange chicken is a popular Chinese-American dish that is known for its sweet and tangy flavor. The dish consists of crispy pieces of battered and deep-fried chicken that are coated in a delicious orange sauce made from orange juice, soy sauce, sugar, vinegar, and ginger. The result is a perfect balance of sweet and sour flavors that are sure to tantalize your taste buds. Orange chicken is typically served over a bed of steaming white rice and is a favorite choice for those looking for a delicious and satisfying meal. Its vibrant orange color and zesty flavor make it a feast for both the eyes and the taste buds.",
      imageUrl:
        "https://drive.google.com/uc?export=view&id=1-FkDyETBOrfKdMQDO8OCWbs8bUxo9gRJ",
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
      description:
        "Sesame chicken is a flavorful Chinese-American dish that is known for its crispy texture and nutty taste. The dish typically consists of bite-sized pieces of deep-fried chicken that are coated in a savory sauce made from a blend of soy sauce, honey, garlic, and sesame oil. The chicken is then topped with toasted sesame seeds, which gives it a deliciously nutty flavor and crunchy texture. Sesame chicken is often served over a bed of steaming white rice and is a popular choice for those looking for a tasty and satisfying meal. Its combination of savory, sweet, and nutty flavors makes it a favorite dish among Chinese food enthusiasts.",
      imageUrl:
        "https://drive.google.com/uc?export=view&id=1-Ds7p5kcZcl4oDGdd-AuUI_PQplLwl_g",
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
      description:
        "Beef and broccoli is a classic Chinese dish that is loved for its simple yet delicious flavor. The dish typically consists of tender strips of beef that are stir-fried with fresh broccoli florets in a savory sauce made from a blend of soy sauce, garlic, and ginger. The result is a satisfying and flavorful meal that is both nutritious and delicious. Beef and broccoli is often served over a bed of steaming white rice and is a popular choice for those looking for a protein-packed and filling meal. Its simple yet flavorful ingredients make it a go-to dish for anyone looking for a tasty and satisfying meal.",
      imageUrl:
        "https://drive.google.com/uc?export=view&id=1-0Iu5SJ3yD8ncBY8V2MalHkedVahYYwG",
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
      description:
        "Pepper steak with onion is a delicious Chinese dish that is known for its bold flavors and tender meat. The dish typically consists of thinly sliced beef that is stir-fried with fresh onions and bell peppers in a flavorful sauce made from a blend of soy sauce, oyster sauce, and black pepper. The result is a savory and satisfying meal that is bursting with flavor. Pepper steak with onion is often served over a bed of steaming white rice and is a popular choice for those looking for a protein-packed and hearty meal. Its combination of tender beef, flavorful peppers, and savory sauce make it a favorite dish among Chinese food enthusiasts.",
      imageUrl:
        "https://drive.google.com/uc?export=view&id=1-EWwCNqIsvxVqN3hskany3tYtCPFu5s_",
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
