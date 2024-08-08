import { createClient } from "redis";

const ONE = "ONEx";

const TWO = "TWOx";

(async () => {
  const publisher1 = createClient();
  await publisher1.connect();

  setInterval(() => {
    publisher1.publish(ONE, `m1 - ${Math.random().toString().slice(5)}`);
  }, 1000);

  const publisher2 = createClient();
  await publisher2.connect();

  setInterval(() => {
    publisher2.publish(TWO, `m2 - ${Math.random().toString().slice(5)}`);
  }, 1000);

  [ONE, TWO].forEach((channel) => {
    [1, 2, 3, 4].forEach(async (index) => {
      const subscriber1 = createClient();
      await subscriber1.connect();

      subscriber1.subscribe(channel, (message, x) => {
        console.log(channel, ", and subscriber: ", index, ", channel: ", x);
        console.log("message: ", message);
      });
    });
  });
})();
