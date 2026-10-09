import { db, products, categories, branchProducts } from '@workspace/db';
import { eq, and } from 'drizzle-orm';

export class MenuService {
  static async listGlobalProducts(tenantId: string) {
    return await db.select()
      .from(products)
      .where(eq(products.tenantId, tenantId));
  }

  static async listBranchProducts(tenantId: string, branchId: string) {
    return await db.select({
      id: branchProducts.id,
      productId: branchProducts.productId,
      price: branchProducts.price,
      available: branchProducts.available,
      name: products.name,
      description: products.description,
      imageUrl: products.imageUrl,
      categoryId: products.categoryId,
    })
    .from(branchProducts)
    .innerJoin(products, eq(products.id, branchProducts.productId))
    .where(
      and(
        eq(branchProducts.tenantId, tenantId),
        eq(branchProducts.branchId, branchId)
      )
    );
  }
}
