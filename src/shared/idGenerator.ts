export type GeneratedIds = {
  orderId: string;
  kotId: string;
};

export function generateOrderAndKot(): GeneratedIds {
  const timestamp = Date.now();

  return {
    orderId: `ORD-${timestamp}`,
    kotId: `KOT-${timestamp}`
  };
}