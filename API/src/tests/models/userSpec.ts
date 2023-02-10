import { User, userStorage } from "../../models/user";

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
  });
  