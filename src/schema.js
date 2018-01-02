export const typeDefs = `

type Cred {
  id: ID!
  website: String
  username: String
  password_id: String
  shared_width: String
  shared_by: String
}

type Query {
  credentials: [Cred]
  credential: Cred
}
`;
