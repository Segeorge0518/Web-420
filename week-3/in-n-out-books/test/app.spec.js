const app = require("../src/app");
const request = require("supertest")

describe("Chapter 3: Api Tests",()=>{
  it("Should return an array of books", async()=>{
    const res=await request(app).get("/api/books");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);

    res.body.forEach((book)=>{
      expect(book).toHaveProperty("id");
      expect(book).toHaveProperty("title");
      expect(book).toHaveProperty("author");
    })
  });

  it("Should return a single book", async()=>{
    const res= await request(app).get("/api/books/5");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", 5);
    expect(res.body).toHaveProperty("title","The Return of the King");
    expect(res.body).toHaveProperty("author","J.R.R. Tolkien")
  });

  it("Should return a 400 error if the id is not a number", async () => {
    const res = await request(app).get("/api/books/foo");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Input must be a number");
  });
});

describe("Chapter 4: API Tests",()=>{
  it("should return a 201 status code when adding a new book", async () => {
    const res = await request(app).post("/api/books").send({
    id: 6,
    title: "The Book of Elsewhere",
    author: "Keanu Reeves"
    });
    expect(res.statusCode).toEqual(201);
  });
  it("should return a 400 status code when adding a new book with missing name", async()=>{
    const res = await request(app).post("/api/books").send({
      id: 7,
      author: "Invalid Author"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Bad Request");
  });
  it("should return a 204 status code when deleting a book", async()=> {
    const res = await request(app).delete("/api/books/6");

    expect(res.statusCode).toEqual(204);
  });
});

describe("Chapter5: API Tests",()=>{
  it("should return a 204 status code when updating a book", async () => {
    const res = await request(app).put("/api/books/1").send({
      title: "The Sunbearer Trials",
      author: "Aiden Thomas"
    })

    expect(res.statusCode).toEqual(204);
  });

  it("should return a 400 status code when updating a book with a non-numeric id", async () => {
    const res = await request(app).put("/api/books/poo").send({
      title: "Test Book",
      author: "test Author"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Input must be a number");
  });

  it("should return a 400 status code when updating a book with missing keys or extra keys", async ()=> {
    const res = await request(app).put("/api/books/1").send({
      title: "Test Book"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Bad Request");

    const res2 = await request(app).put("/api/books/1").send({
      title: "Test Book",
      author: "Test Author",
      extraKey: "key"
    });

    expect(res2.statusCode).toEqual(400);
    expect(res2.body.message).toEqual("Bad Request");
  });
});