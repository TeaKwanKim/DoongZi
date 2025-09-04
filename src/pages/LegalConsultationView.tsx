import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, Star, Clock, Search, MessageSquare, Calendar, Award } from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  experience: number;
  specialties: string[];
  rating: number;
  reviews: number;
  priceRange: string;
  avatar?: string;
  cases: number;
}

export function LegalConsultationView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("recommended");

  const lawyers: Lawyer[] = [
    {
      id: "1",
      name: "김민수 변호사",
      experience: 12,
      specialties: ["층간소음", "소액소송", "분쟁조정"],
      rating: 4.8,
      reviews: 156,
      priceRange: "10만원~30만원",
      cases: 89
    },
    {
      id: "2", 
      name: "이지영 변호사",
      experience: 8,
      specialties: ["부동산분쟁", "층간소음", "민사소송"],
      rating: 4.6,
      reviews: 203,
      priceRange: "8만원~25만원",
      cases: 124
    },
    {
      id: "3",
      name: "박준호 변호사", 
      experience: 15,
      specialties: ["집합건물법", "층간소음", "손해배상"],
      rating: 4.9,
      reviews: 98,
      priceRange: "15만원~40만원",
      cases: 67
    }
  ];

  const recentConsultations = [
    {
      id: "1",
      lawyer: "김민수 변호사",
      date: "2024-01-15",
      status: "완료",
      topic: "층간소음 분쟁조정 절차"
    },
    {
      id: "2", 
      lawyer: "이지영 변호사",
      date: "2024-01-08",
      status: "진행중",
      topic: "소액소송 준비 상담"
    }
  ];

  const categories = [
    { id: "recent", label: "최근 상담", icon: Clock },
    { id: "recommended", label: "상담사 추천", icon: Star },
    { id: "search", label: "키워드 검색", icon: Search },
    { id: "all", label: "모든 상담사", icon: Scale }
  ];

  return (
    <div className="pb-20 pt-6 px-4 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">⚖️ 법률상담</h1>
        <p className="text-muted-foreground">전문가와 상담받아보세요</p>
      </div>

      {/* 카테고리 탭 */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">최근 상담</TabsTrigger>
          <TabsTrigger value="recommended">상담사 추천</TabsTrigger>
        </TabsList>

        {/* 최근 상담 */}
        <TabsContent value="recent" className="mt-6 space-y-4">
          {recentConsultations.length > 0 ? (
            recentConsultations.map((consultation) => (
              <Card key={consultation.id} className="p-4 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{consultation.lawyer}</h3>
                  <Badge variant={consultation.status === "완료" ? "default" : "outline"}>
                    {consultation.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{consultation.topic}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{consultation.date}</span>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    이어가기
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">최근 상담 내역이 없습니다.</p>
            </div>
          )}
        </TabsContent>

        {/* 상담사 추천 */}
        <TabsContent value="recommended" className="mt-6 space-y-4">
          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="키워드로 검색 (층간소음, 소액소송 등)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* 추천 상담사 목록 */}
          {lawyers.map((lawyer) => (
            <Card key={lawyer.id} className="p-4 shadow-card hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* 상담사 기본 정보 */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={lawyer.avatar} />
                    <AvatarFallback>{lawyer.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{lawyer.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {lawyer.experience}년 경력
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{lawyer.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({lawyer.reviews}개 후기)
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {lawyer.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 상담 정보 */}
                <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">상담료</p>
                    <p className="text-sm font-medium">{lawyer.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">처리 사건</p>
                    <p className="text-sm font-medium">{lawyer.cases}건</p>
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-primary text-primary-foreground shadow-peaceful">
                    <Calendar className="h-4 w-4 mr-2" />
                    상담 예약
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    채팅 상담
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}