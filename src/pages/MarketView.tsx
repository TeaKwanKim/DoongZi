import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Star, Package, Home, Volume2, Wrench } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  category: string;
  image?: string;
  isRecommended?: boolean;
  discount?: string;
}

export function MarketView() {
  const [activeCategory, setActiveCategory] = useState("recommended");

  const products: Product[] = [
    {
      id: "1",
      name: "프리미엄 방음 카펫 (200cm x 150cm)",
      price: "89,000원",
      originalPrice: "120,000원",
      rating: 4.8,
      reviews: 234,
      category: "carpet",
      isRecommended: true,
      discount: "26%"
    },
    {
      id: "2",
      name: "층간소음 방지 매트 세트",
      price: "45,000원",
      rating: 4.6,
      reviews: 89,
      category: "mat"
    },
    {
      id: "3",
      name: "방음 커튼 (차음 등급 A)",
      price: "156,000원",
      originalPrice: "180,000원",
      rating: 4.7,
      reviews: 67,
      category: "curtain",
      discount: "13%"
    },
    {
      id: "4",
      name: "화이트노이즈 머신 프로",
      price: "78,000원",
      rating: 4.9,
      reviews: 145,
      category: "device",
      isRecommended: true
    },
    {
      id: "5",
      name: "전문 방음재 시공 서비스",
      price: "상담 후 결정",
      rating: 4.5,
      reviews: 23,
      category: "service"
    }
  ];

  const categories = [
    { id: "recommended", label: "추천 솔루션", icon: Star },
    { id: "carpet", label: "방음재/러그", icon: Home },
    { id: "curtain", label: "방음 커튼", icon: Package },
    { id: "device", label: "소음차단 기기", icon: Volume2 },
    { id: "service", label: "시공 서비스", icon: Wrench }
  ];

  const getFilteredProducts = (category: string) => {
    if (category === "recommended") {
      return products.filter(p => p.isRecommended);
    }
    return products.filter(p => p.category === category);
  };

  return (
    <div className="pb-20 pt-6 px-4 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">🛒 마켓</h1>
        <p className="text-muted-foreground">소음 해결 솔루션을 찾아보세요</p>
      </div>

      {/* 개인 맞춤 추천 */}
      <Card className="p-4 shadow-card bg-gradient-peaceful">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary rounded-full">
            <Star className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">맞춤 추천</h3>
            <p className="text-sm text-muted-foreground">
              최근 경고 패턴 분석 결과
            </p>
          </div>
        </div>
        <p className="text-sm text-foreground mb-3">
          바닥 충격음이 주된 소음 원인으로 분석됩니다. 
          방음 카펫이나 매트 설치를 권장드려요.
        </p>
        <Button size="sm" className="bg-primary text-primary-foreground">
          추천 상품 보기
        </Button>
      </Card>

      {/* 카테고리 탭 */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommended">추천</TabsTrigger>
          <TabsTrigger value="carpet">방음재</TabsTrigger>
          <TabsTrigger value="service">시공</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6 space-y-4">
          {/* 상품 목록 */}
          {getFilteredProducts(activeCategory).map((product) => (
            <Card key={product.id} className="p-4 shadow-card hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                {/* 상품 이미지 영역 */}
                <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>

                {/* 상품 정보 */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground flex-1">
                      {product.name}
                    </h3>
                    {product.isRecommended && (
                      <Badge className="bg-primary text-primary-foreground ml-2">
                        추천
                      </Badge>
                    )}
                  </div>

                  {/* 평점 */}
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews}개 후기)
                    </span>
                  </div>

                  {/* 가격 */}
                  <div className="flex items-center gap-2">
                    {product.discount && (
                      <Badge variant="destructive" className="text-xs">
                        {product.discount} 할인
                      </Badge>
                    )}
                    <span className="text-lg font-bold text-foreground">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-primary text-primary-foreground shadow-peaceful">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    구매하기
                  </Button>
                  <Button variant="outline" className="flex-1">
                    상세보기
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {/* 빈 상태 */}
          {getFilteredProducts(activeCategory).length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">준비 중인 카테고리입니다.</p>
              <p className="text-sm text-muted-foreground">곧 다양한 상품을 만나보실 수 있어요!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* 제휴 서비스 안내 */}
      <Card className="p-4 shadow-card border-primary">
        <div className="flex items-center gap-3 mb-3">
          <Wrench className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">전문 시공 서비스</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          QuietNest 제휴 업체를 통해 전문적인 방음 시공을 받아보세요.
          무료 상담부터 A/S까지 책임지겠습니다.
        </p>
        <Button variant="outline" size="sm" className="border-primary text-primary">
          무료 상담 신청
        </Button>
      </Card>
    </div>
  );
}