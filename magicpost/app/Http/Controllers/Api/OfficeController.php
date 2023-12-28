<?php

namespace App\Http\Controllers\api;

use App\Models\Office;
use App\Models\Parcel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class OfficeController extends Controller
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
        $office = Office::all();
        if ($office->count() > 0) {
            return response()->json([
                'status' => 200,
                'office' => $office
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Not found any office"
            ], 404);
        }
    }

    //get by id
    public function show(Request $request) {
        $id = $request->id;
        $office = Office::find($id);
        if ($office->count() > 0) {
            return response()->json([
                'status' => 200,
                'parcel' => $office
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
            $office = Office::create(array_merge(
                $validator->validated(), 
            ));
        }
        return response()->json([
            'message' => "created successfully", 
            'office' => $office
        ], 201);
        
    }
    

    //delete
    public function destroy(Request $request, int $id) {
        //$id = $request->id;
        $office = Office::find($id);
        if ($office) {
            $office->delete();
            return response()->json([
                'status' => 200, 
                'message' => "Office deleted successfully"
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
            $office = Office::find($id);
            $office -> update([
                'name' => $request->name,
                'managerid' => $request->managerid
            ]);
                
        }
        if ($office) {
            return response()->json([
                'message' => "OK"
            ]);
        }
    }

    public function getIncomingFromCustomer(Request $request) {
        $id = $request->id;
        $of = Office::find($id);
        $jsonlist = $of->incomingFromCustomer;
        $arr = json_decode($jsonlist);
        $res = array();
        for ($i = 0; $i < count($arr); $i++) {
            $parcel = Parcel::find($arr[$i]);
            array_push($res, $parcel);
        }
        //$ret = json_encode($res);
        return response()->json([
            'arr' => $res
        ], 200);
    }

    public function addToIncomingFromCustomer(int $officeID, int $parcelid) {
        $of = Office::find($officeID);
        $jsonlist = $of->incomingFromCustomer;
        $arr = json_decode($jsonlist);
        array_push($arr, $parcelid);
        $jsonarr = json_encode($arr);
        $of->update([
            'incomingFromCustomer' => $jsonarr
        ]);
    }

    public function removeIncomingFromCustomer(int $officeID, int $parcelid) {
        $of = Office::find($officeID);
        $jsonlist = $of->incomingFromCustomer;
        $arr = json_decode($jsonlist);
        // for ($i = 0; $i < sizeof($arr); $i++) {
        //     if ($arr[$i] == $parcelid) {
        //         unset($arr[$i]);
        //         break;
        //     }
        // }
        // 
        foreach (array_keys($arr, $parcelid) as $key) {
            unset($arr[$key]);
        }
        $jsonarr = json_encode(array_values($arr));
        $of->update([
            'incomingFromCustomer' => $jsonarr
        ]);
    }

    public function getIncomingFromWarehouse(Request $request) {
        $id = $request->id;
        $of = Office::find($id);
        $jsonlist = $of->incomingFromWarehouse;
        $arr = json_decode($jsonlist);
        $res = array();
        for ($i = 0; $i < count($arr); $i++) {
            $parcel = Parcel::find($arr[$i]);
            array_push($res, $parcel);
        }
        //$ret = json_encode($res);
        return response()->json([
            'arr' => $res
        ], 200);
    }

    public function addToIncomingFromWarehouse(int $officeID, int $parcelid) {
        $of = Office::find($officeID);
        $jsonlist = $of->incomingFromWarehouse;
        $arr = json_decode($jsonlist);
        array_push($arr, $parcelid);
        $jsonarr = json_encode($arr);
        $of->update([
            'incomingFromWarehouse' => $jsonarr
        ]);
    }

    public function removeIncomingWarehouse(int $officeID, int $parcelid) {
        $of = Office::find($officeID);
        $jsonlist = $of->incomingFromWarehouse;
        $arr = json_decode($jsonlist);
        unset($arr[$parcelid]);
        $jsonarr = json_encode($arr);
        $of->update([
            'incomingFromWarehouse' => $jsonarr
        ]);
    }

    public function getOutgoingFromCustomer(Request $request) {
        $id = $request->id;
        $of = Office::find($id);
        $jsonlist = $of->outgoingFromCustomer;
        $arr = json_decode($jsonlist);
        $res = array();
        for ($i = 0; $i < count($arr); $i++) {
            $parcel = Parcel::find($arr[$i]);
            array_push($res, $parcel);
        }
        //$ret = json_encode($res);
        return response()->json([
            'arr' => $res
        ], 200);
    }

    public function addToOutgoingToCustomer(int $officeID, int $parcelid) {
        $of = Office::find($officeID)->first;
        $jsonlist = $of->outgoingToCustomer;
        $arr = json_decode($jsonlist);
        array_push($arr, $parcelid);
        $jsonarr = json_encode($arr);
        $of->update([
            'outgoingFromCustomer' => $jsonarr
        ]);
        if ($of) {
            return response() -> json([
                'message' => "sended to office succesfully",
                'parcelid' => $parcelid
            ]);
            //return true;
        } else {
            return response() -> json([
                'message' => "send to office unsuccesfully",
                'parcelid' => $parcelid
            ]);
            //return false;
        }
    }

    public function removeOutgoingFromCustomer(int $officeID, int $parcelid) {
        $of = Office::find($officeID);
        $jsonlist = $of->outgoingFromCustomer;
        $arr = json_decode($jsonlist);
        unset($arr[$parcelid]);
        $jsonarr = json_encode($arr);
        $of->update([
            'outgoingFromCustomer' => $jsonarr
        ]);
    }

    public function getOutgoingFromWarehouse(Request $request) {
        $id = $request->id;
        $of = Office::find($id);
        $jsonlist = $of->outgoingFromWarehouse;
        $arr = json_decode($jsonlist);
        $res = array();
        for ($i = 0; $i < count($arr); $i++) {
            $parcel = Parcel::find($arr[$i]);
            array_push($res, $parcel);
        }
        //$ret = json_encode($res);
        return response()->json([
            'arr' => $res
        ], 200);
    }

    public function addToOutgoingFromWarehouse(int $officeID, int $parcelid) {
        $of = Office::find($officeID);
        $jsonlist = $of->outgoingFromWarehouse;
        $arr = json_decode($jsonlist);
        array_push($arr, $parcelid);
        $jsonarr = json_encode($arr);
        $of->update([
            'outgoingFromWarehouse' => $jsonarr
        ]);
    }

    public function removeToOutgoingWarehouse(int $officeID, int $parcelid) {
        $of = Office::find($officeID);
        $jsonlist = $of->outgoingFromWarehouse;
        $arr = json_decode($jsonlist);
        unset($arr[$parcelid]);
        $jsonarr = json_encode($arr);
        $of->update([
            'outgoingFromWarehouse' => $jsonarr
        ]);
    }

    public function sendToWarehouse(Request $request) {
        //$officeID = $request->officeID;
        $usrctrl = new UserController();
        $officeID = $usrctrl->getUserOfficeID($request);
        $parcelid = $request->parcelid;
        //$parcel:
        $this->removeIncomingFromCustomer($officeID, $parcelid);
        $whctrl = new WarehouseController();
        $status = $whctrl->addIncomingFromOffice($officeID, $parcelid);
        if ($status) {
            return response() -> json([
                'status' => 200,
                'message' => "send successfully"
            ]);
        } else {
            return response() -> json([
                'status' => 400,
                'message' => "send unsuccessfully"
            ]);
        }
    }

    


   

}
