export default async () => {
  const nonJsonResponse = await fetch("/api/todos/getItems");
  const jsonResponse = await nonJsonResponse.json();
  return jsonResponse;
};
