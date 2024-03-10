function status(request, response) {
  response.status(200).json({ "será que": "amo minha pozinha" });
}

export default status;
