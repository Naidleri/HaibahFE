function makeDummyHistory(userId, count = 10) {
  const now = Date.now();
  return Array.from({ length: count }).map((_, i) => {
    const isArabica = Math.random() < 0.5;
    return {
      id: i + 1,
      prediction_result: isArabica ? '1' : '2',
      number_prediction: Math.floor(Math.random() * 10) + 1,
      userId: userId,
      hasil: isArabica ? 'arabica' : 'robusta',
      createdAt: new Date(now - i * 3600_000).toISOString(),
      updatedAt: new Date(now - i * 3600_000).toISOString(),
    };
  });
}

export async function readHistoryByUserId(userId, token) {
  return { message: 'Success', data: makeDummyHistory(userId, 10) };
}
