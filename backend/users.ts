export class User {
    constructor(
        public email: string,
        public name: string,
        public password: string
    ) {}

    public matches(another: User): boolean {
        return another !== undefined && another.email === this.email && another.password == this.password
    }
}

export const users: {[key: string]: User} = {
    "gabriel@email.com": new User('gabriel@email.com', 'Gabriel', 'gabriel123'),
    "marilia@email.com": new User('marilia@email.com', 'Marília', 'marilia123')
}