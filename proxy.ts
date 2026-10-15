import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 公開前のためサイト全体（画像含む）を Basic 認証で保護する
export function proxy(request: NextRequest) {
  const user = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;

  const header = request.headers.get("authorization");
  if (user && password && header?.startsWith("Basic ")) {
    const decoded = atob(header.slice("Basic ".length));
    const sep = decoded.indexOf(":");
    if (decoded.slice(0, sep) === user && decoded.slice(sep + 1) === password) {
      return NextResponse.next();
    }
  }

  // 環境変数が未設定の場合も通さない（設定漏れで公開されてしまうのを防ぐ）
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area", charset="UTF-8"' },
  });
}

export const config = {
  matcher: "/:path*",
};
