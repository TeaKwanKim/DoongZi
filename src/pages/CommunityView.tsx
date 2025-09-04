import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Pin, AlertTriangle, Clock } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  category: "general" | "noise" | "notice";
  comments: number;
  isPinned?: boolean;
}

export function CommunityView() {
  const [activeTab, setActiveTab] = useState("general");

  const posts: Post[] = [
    {
      id: "1",
      title: "🔔 지속 소음 세대 공지 - 403호",
      content: "관리사무소에서 공지드립니다. 403호 세대는 최근 4주간 6건 이상의 소음 경고를 받아 지속 소음 세대로 분류되었습니다.",
      author: "관리사무소",
      timestamp: "2시간 전",
      category: "notice",
      comments: 12,
      isPinned: true
    },
    {
      id: "2",
      title: "층간소음 해결을 위한 카펫 공동구매 어떠세요?",
      content: "좋은 품질의 방음 카펫을 공동구매하면 더 저렴하게 구입할 수 있을 것 같아요. 관심 있으신 분들 댓글 부탁드려요!",
      author: "301호",
      timestamp: "5시간 전",
      category: "general", 
      comments: 8
    },
    {
      id: "3",
      title: "아이들 뛰는 소리 관련 의견 나눠요",
      content: "어린 아이가 있는 세대입니다. 최대한 조심하고 있지만, 아이들이다 보니 완전히 막기는 어려워요. 다른 분들은 어떻게 하고 계신지 궁금합니다.",
      author: "502호",
      timestamp: "1일 전",
      category: "noise",
      comments: 15
    },
    {
      id: "4",
      title: "관리비 고지서 - 2024년 1월",
      content: "2024년 1월 관리비가 고지되었습니다. 자세한 내용은 첨부된 파일을 확인해 주세요.",
      author: "관리사무소",
      timestamp: "3일 전",
      category: "notice",
      comments: 3,
      isPinned: true
    }
  ];

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "notice":
        return <Badge className="bg-primary text-primary-foreground">공지</Badge>;
      case "noise":
        return <Badge className="bg-warning text-warning-foreground">소음</Badge>;
      default:
        return <Badge variant="outline">자유</Badge>;
    }
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === "general") return post.category === "general";
    if (activeTab === "noise") return post.category === "noise";
    if (activeTab === "notice") return post.category === "notice";
    return true;
  });

  return (
    <div className="pb-20 pt-6 px-4 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">💬 커뮤니티</h1>
        <p className="text-muted-foreground">이웃과 소통해보세요</p>
      </div>

      {/* 탭 메뉴 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">자유게시판</TabsTrigger>
          <TabsTrigger value="notice">관리사무소</TabsTrigger>
          <TabsTrigger value="noise">소음 토론</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6 space-y-4">
          {/* 글쓰기 버튼 */}
          <Button className="w-full bg-gradient-primary text-primary-foreground shadow-peaceful">
            <MessageSquare className="h-4 w-4 mr-2" />
            새 글 작성하기
          </Button>

          {/* 게시글 목록 */}
          {filteredPosts.map((post) => (
            <Card key={post.id} className="p-4 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="space-y-3">
                {/* 헤더 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {post.isPinned && (
                      <Pin className="h-4 w-4 text-primary" />
                    )}
                    {getCategoryBadge(post.category)}
                    {post.category === "notice" && (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.timestamp}
                  </div>
                </div>

                {/* 제목과 내용 */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.content}
                  </p>
                </div>

                {/* 하단 정보 */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* 빈 상태 */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">아직 게시글이 없습니다.</p>
          <p className="text-sm text-muted-foreground">첫 번째 글을 작성해보세요!</p>
        </div>
      )}
    </div>
  );
}