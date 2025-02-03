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

  it("Should return a 400 error if the id is not a number", async()=>{
    const res = await request(app).get("/api/books/foo");
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Input must be a number");
  });
})
