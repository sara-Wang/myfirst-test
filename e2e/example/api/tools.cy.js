export default class Tools {
    get_token() {
        cy.request({
            url: "https://dycharts.com/vis/auth/login",
            method: "post",
            form: true,
            body: {
                username: "13000000008",
                password: "000008",
            },
        }).then((res) => {
            cy.wrap(res.body.data.token).as("token");
        });
    }
}
