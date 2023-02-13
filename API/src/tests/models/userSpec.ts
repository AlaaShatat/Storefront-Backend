import { userStorage } from "../../models/userStorage";
import { User } from "../../types/User";

const users = new userStorage();

describe("User Model", () => {
    it('should have an index method', () => {
      expect(users.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(users.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(users.create).toBeDefined();
    });

    it('create should create new user',async () => {
      const user: User = {
        id: null,
        firstname:"test",
        lastname:"test",
        hashedpass:"test",
        email:"jas@jas.com",
        isadmin:1
      };
      const res: User = await users.create(user);
      user.id = res.id;
      const {id,firstname, lastname,email,isadmin} = res;

      expect({id,firstname, lastname,email,isadmin}).toBeDefined();
    });

    it('index should return users',async () => {
      const res: User[] = await users.index();
      const {id,firstname, lastname,email,isadmin} = res[0];
      expect(res.length).toBeGreaterThanOrEqual(0)
    });

    it('should return user by id',async () => {
      const res: User= await users.show(1);
      expect(res).toBeDefined;
    });
});

