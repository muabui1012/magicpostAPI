<?php

namespace App\Http\Controllers\api;

use App\Models\UserDetail;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Contracts\Providers\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }
    //
    public function idenUser(Request $request) {
        //$token = $request->bearerToken();
        $token = JWTAuth::getToken();
        $apy = JWTAuth::getPayload($token)->toArray();
        $user = auth()->user();
        return response() ->json([
            'user' => $user
        ]);
    }

    public function getUser(Request $request) {
        $user = auth()->user();
        return $user;
    }

    public function getUserOfficeID(Request $request) {
        $user = auth()->user();
        $user_id = $user->id;
        $detail = UserDetail::where('userid', $user_id)->first();
        return $detail->departmentid;
    }

    public function addUserDetail(Request $request, int $userid) {
        $userDetail = UserDetail::create([
            'id' => $userid,
            'roleid' => $request->roleid,
            'department_type' => $request->department_type,
            'department_id' => $request->department_id
        ]);
    }
}
