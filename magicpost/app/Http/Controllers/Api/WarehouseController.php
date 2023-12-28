<?php

namespace App\Http\Controllers\api;

use App\Models\Parcel;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class WarehouseController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);


    }

    //get all
    public function index(Request $request) {
        $wh = Warehouse::all();
        if ($wh->count() > 0) {
            return response()->json([
                'status' => 200,
                'warehouse' => $wh
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Not found any wh"
            ], 404);
        }
    }

    //get by id
    public function show(Request $request) {
        $id = $request->id;
        $wh = Warehouse::find($id);
        if ($wh->count() > 0) {
            return response()->json([
                'status' => 200,
                'parcel' => $wh
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Not found any office"
            ], 404);
        }
    }

    //create new
    public function store(Request $request) {
        $validator = Validator::make($request->all(),[
            'name' => 'required', 
            
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 400);
        } else {
            $wh = Warehouse::create(array_merge(
                $validator->validated(), 
            ));
        }
        return response()->json([
            'message' => "created successfully", 
            'warehouse' => $wh
        ], 201);
        
    }


    //delete
    public function destroy(Request $request, int $id) {
        //$id = $request->id;
        $wh = Warehouse::find($id);
        if ($wh){
            $wh->delete();
            return response()->json([
                'status' => 200, 
                'message' => "Warehouse deleted successfully"
            ], 200);
        } else {
            return response()->json([
                'status' => 404, 
                'message' => "Smth went wrong"
            ], 404);
        }

    }

    //update
    public function update(Request $request, $id) {
        //$id = $request->id;
        $validator = Validator::make($request->all(), [
            // 'name' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
            $warehouse = Warehouse::find($id);
            $warehouse -> update([
                'name' => $request->name,
                'managerid' => $request->managerid
            ]);
                
        }
        if ($warehouse) {
            return response()->json([
                'message' => "OK"
            ]);
        }
    }

    public function addIncomingFromOffice($officeID,int $parcelID) {
        //$parcel = Parcel::where('id', $parcelID);
        $this_wh = Warehouse::where('officeID', $officeID)->first();
        $jsonlist = $this_wh->incomingFromOffice;
        $arr = json_decode($jsonlist);
        array_push($arr, $parcelID);
        $jsonarr = json_encode($arr);
        $this_wh->update([
            'incomingFromOffice' => $jsonarr
        ]);
        if ($this_wh) {
            return true;
        }
        return false;
    }

    public function sendToOffice(Request $request) {
        $parcelid = $request->id;
        $usrctrl = new UserController();
        $user = $usrctrl->getUser($request);
        if ($user->department_type == "warehouse"|| true) {
            $id = $user->departmentid;
            $wh = Warehouse::where('id', $id)->first();
            if (!$wh) {
                return response() -> json([
                    'message' => "Not found your warehouse",
                    'id' => $id,
                    'user' => $user,
                    '$wh' => $wh
                ]);
            } else {
                // return response() -> json([
                //     'id' => $id,
                //     'user' => $user,
                //     '$wh' => $wh
                // ]);

                $list = $wh->outgoingToOffice;
                $officeID = $wh->officeid;
                $cF = new commonFunctions();
                if (!($cF->findJsonList($list, $parcelid))) {
                    return response() -> json([
                        'message' => "Not found parcel"
                    ], 404);
                } else {
                    // return response() -> json([
                    //     'message' => $wh
                    // ], 404);

                    $ofc = new OfficeController();
                    $status = $ofc -> addToOutgoingToCustomer($officeID, $parcelid);
                    if ($status) {
                        $wh->update([
                            //'outgoingToOffice' => $cF->removeFromJsonList($wh->outgoingToOffice, $parcelid)
                        ]);
                        if ($wh) {
                            return response() -> json([
                                'message' => "sended successfully"
                            ], 200);
                        } else {
                            return response() -> json([
                                'message' => "send unsuccesfully"
                            ], 500);
                        }
                        // $wh->outgoingToOffice => $cF->removeFromJsonList($wh->outgoingToOffice, $parcelid);
                        // return response() -> json([
                        //     'message' => "Not found your warehouse"
                        // ]);
                    }
                }
            }

        }

    }
}
