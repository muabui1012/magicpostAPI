<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Models\Parcel;
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

    public function getByRole(Request $request) {
        $user = auth()->user();
        $user_id = $user->id;
        $detail = UserDetail::where('userid', $user_id)->first();
        $dep_type = $detail->department_type;
        $dep_id = $detail->departmentid;
        $staffdetail = UserDetail::where([
            ['department_type', $dep_type],
            ['departmentid', $dep_id]
        ])->get(); 
        
        $arr = $staffdetail->toArray();
        $res = [];
        for ($i = 0; $i < sizeof($arr); $i++) {
            $staff = User::where('id', $arr[$i]['userid'])->first();
            array_push($res, $staff);
        }
        // $res =[];
        // foreach ($arr as $mem) {
        //     $staff = User::where('id', $mem->userid);
        //     array_push($res, $staff);
        // }
        // $fulldetailtable = DB::table('users')
        //                     ->join('userdetail', 'id', '=', 'userid')
        //                     ->select('users.*', '')

        return response() -> json([
            'stafflist' => $res,
            //'staffdetail' => $staffdetail,

        ]);
    }

    public function getUser(Request $request) {
        $user = auth()->user();
        return $user;
    }


    public function getUserDetail(Request $request) {
        $user = auth()->user();
        $user_id = $user->id;
        $detail = UserDetail::where('userid', $user_id)->first();
        
        return $detail;
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

    public function getFullStatistic(Request $request) {
        //$parcellist = Parcel::all();
        $recieved = 0;
        $sended = 0;
        $success = Parcel::where('status', "OK")->count();
        $failedparcel = Parcel::where('status', "Hoàn lại kho")->count();
        // $fail = 0;
        // if  (!is_countable($failedparcel)) {
        //     $fail = 0;
        // }else {
        //     $fail = count($failedparcel, COUNT_NORMAL);
        // }

        return response()->json([
            'success' => $success,
            'fail' => $failedparcel
        ]);

    }


}
