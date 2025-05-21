CREATE TABLE userdetails (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE bookdetails (
  id SERIAL PRIMARY KEY,
  bname VARCHAR(50),
  rating INTEGER,
  recency INTEGER,
  notes TEXT,
  userid INTEGER REFERENCES userdetails(id)
);

-- Insert default user
INSERT INTO userdetails (name) VALUES ('Adivi');

-- Insert sample books
INSERT INTO bookdetails (bname, rating, recency, notes, userid)
VALUES 
('Harry Potter', 9, 2000, 'This is the best fantasy I have ever read', 1),
('Winterfell', 10, 2006, 'The greatest kingdom drama', 1);
