import faker from "faker";
import fs from "fs";

function getUsers() {
    let user = [];
    let address = [];
    faker.setLocale("zh_CN");
    for (let i = 1; i < 50; i++) {
        user.push({
            id: i,
            name: faker.name.firstName() + faker.name.lastName(),
            jobTitle: faker.name.jobTitle(),
            email: faker.internet.email(),
        });

        address.push({
            id: i,
            city: faker.address.city(),
            streetName: faker.address.streetName(),
        });
    }
    return { user: user, address: address };
}

let data = getUsers();
fs.writeFileSync("data.json", JSON.stringify(data));
