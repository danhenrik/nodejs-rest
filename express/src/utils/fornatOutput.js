const response = (data, err) => {
  return { data: data || null, error: err || null };
};

const error = (err) => {
  if (err instanceof Error) err = err.message;
  return response(null, err);
};

const ok = (data) => {
  return response(data, null);
};

module.exports = {
  ok,
  error,
};
