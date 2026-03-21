<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CompressResponse
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (!$this->shouldCompress($request, $response)) {
            return $response;
        }

        $content = gzencode($response->getContent(), 9);

        $response->setContent($content);
        $response->headers->set('Content-Encoding', 'gzip');
        $response->headers->set('Content-Length', (string) strlen($content));

        return $response;
    }

    private function shouldCompress(Request $request, Response $response): bool
    {
        return str_contains($request->header('Accept-Encoding', ''), 'gzip')
            && strlen($response->getContent()) > 1024;
    }
}
