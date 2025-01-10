import { createModelSchema, primitive } from "serializr";

export default class UserSession {
  constructor({ oid, name, email, role } = {}) {
    this.oid = oid;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}

createModelSchema(SessionToken, {
  oid: primitive(),
  name: primitive(),
  email: primitive(),
  role: primitive()
});
