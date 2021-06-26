/**
 * Get authorization bearer token either from subscription Authorization | authorization key,
 * or if is regular http from the headers Authorization | authorization
 * @param ctx
 */
export const getGraphqlToken = (ctx: {
  connection: any;
  req: any;
}): { headers: { authorization: string } } => {
  const { connection, req } = ctx;
  /**
   * If no token exist, make a default of "" so that it can throw an UNAUTHENTICATED exception
   * @param source
   */
  const getToken = (source: any) =>
    source.authorization || source.Authorization || "";
  if (connection) {
    const context = connection.context;
    const token = getToken(context);
    return {
      headers: {
        authorization: token,
      },
    };
  }
  if (req) {
    const headers = req.headers;
    const token = getToken(headers);
    return {
      headers: {
        authorization: token,
      },
    };
  }
};
