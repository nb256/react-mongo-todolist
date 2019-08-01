export default async ({ _id, status, content, deadline }) => {
  const nonJsonResponse = await fetch("/api/todos/updateItem", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content,
      deadline: deadline instanceof Date ? deadline.toISOString() : deadline,
      _id,
      status
    })
  });
  const response = await nonJsonResponse.json();
  return response;
};
