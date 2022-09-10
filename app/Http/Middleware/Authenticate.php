<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return response()->json(['error' => 'UnAuthorised'], 404);
        }

    }

    protected function unauthenticated($request, array $guards)
    {
        $response = [
            'statusCode' => 401,
            'message' => 'Unauthenticated user!',
        ];
        abort(response()->json($response, 401));
    }
}
