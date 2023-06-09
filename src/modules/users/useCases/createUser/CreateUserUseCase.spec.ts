import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "./ICreateUserDTO";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create a user", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user: ICreateUserDTO = {
      name: "Ramon Mattjie",
      email: "ramon@gmail.com",
      password: "12345",
    };

    const result = await createUserUseCase.execute(user);

    expect(result).toEqual(
      expect.objectContaining({
        id: result.id,
        name: result.name,
        email: result.email,
      })
    );
  });

  it("should not be able to create a user with exists email", async () => {
    const user1: ICreateUserDTO = {
      name: "Lucas Antonio",
      email: "lucas@gmail.com",
      password: "12345",
    };

    await createUserUseCase.execute(user1);

    await expect(createUserUseCase.execute(user1)).rejects.toEqual(
      new CreateUserError()
    );
  });
});
