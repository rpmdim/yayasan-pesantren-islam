export const users = [
  {
    id: 1,
    role: "Member",

    email: "member@mail.com",
    password: "123456",

    salutation: "Mr",
    firstName: "Budi",
    lastName: "Santoso",
    nationality: "Indonesia",
    countryCode: "+62",
    phoneNumber: "81234567890",
    birthDate: "1998-05-12",

    airlineCode: null,
  },
  {
    id: 2,
    role: "Staff",

    email: "staff@mail.com",
    password: "123456",

    salutation: "Ms",
    firstName: "Siti",
    lastName: "Rahma",
    nationality: "Indonesia",
    countryCode: "+62",
    phoneNumber: "81398765432",
    birthDate: "1995-09-21",

    airlineCode: "GAR123",
  },
];

export function getUsers() {
  return users;
}

export function addUser(user) {
  users.push(user);
}