import { createModelSchema, primitive } from "serializr";

export default class SessionToken {
  constructor({ group, accessToken } = {}) {
    // NOTE: Needed for logging
    this.group = group;
    this.accessToken = accessToken;
  }
}

createModelSchema(SessionToken, {
  group: primitive(),
  accessToken: primitive()
});
