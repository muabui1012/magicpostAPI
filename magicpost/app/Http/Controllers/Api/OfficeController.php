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
        //$id = $request->id;
        $usrctrl = new UserController();
        $ofid = $usrctrl->getUserDetail($request)->departmentid;
        $of = Office::find($ofid);
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
        //$id = $request->id;
        $usrctrl = new UserController();
        $ofid = $usrctrl->getUserDetail($request)->departmentid;
        $of = Office::find($ofid);
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

    public function getOutgoingToCustomer(Request $request) {
        //$id = $request->id;
        $usrctrl = new UserController();
        $ofid = $usrctrl->getUserDetail($request)->departmentid;
        // return response()->json([
        //     'arr' => $ofid
        // ], 200);
        $of = Office::find($ofid);
        $jsonlist = $of->outgoingToCustomer;
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
            'outgoingToCustomer' => $jsonarr
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

    public function sendToCustomer(Request $request) {
        //$officeID = $request->officeID;
        $usrctrl = new UserController();
        $officeID = $usrctrl->getUserOfficeID($request);
        $parcelid = intval($request->id);
        $of = Office::where('id', $officeID)->first();
        $incoming = $of->incomingFromWarehouse;
        $outgoing = $of->outgoingToCustomer;
        if (!$this->find($incoming, $parcelid)) {
            return response() -> json([
                'status' => $officeID,
                'message' => 'not found parcel'
            ]);
        }
        $outgoing = $this->add($outgoing, $parcelid);
        $incoming = $this->remove($incoming, $parcelid);
        // return response() -> json([
        //     'status' => $this->find($incoming, $parcelid),
        //     'message' => $of,
        //     'a' => $incoming,
        //     'b' => $outgoing
        // ]);
        $of -> update([
            'incomingFromWarehouse' => $incoming,
            'outgoingToCustomer' => $outgoing
        ]);
        //$parcel:
        //$this->removeIncomingWarehouse($officeID, $parcelid);
        //$status = $this->addToOutgoingToCustomer($officeID, $parcelid);
        if ($of) {
            $msg = "Đang giao";
            $pctrl = new ParcelController();
            $pctrl->addTrace($parcelid, $msg);
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

    public function shipConfirm(Request $request) {
        $parcelid = $request->id;
        $parcel = Parcel::where('id', $parcelid)->first();
        //$officeID = $request->officeID;
        $usrctrl = new UserController();
        $officeID = $usrctrl->getUserOfficeID($request);
        $parcelid = intval($request->id);
        $of = Office::where('id', $officeID)->first();
        $incoming = $of->outgoingToCustomer;
        $outgoing = $of->failed;
        // return response() -> json([
        //     'status' => $of,
        //     'message' => 'not found parcel'

        // ]);
        if (!$this->find($incoming, $parcelid)) {
            return response() -> json([
                'status' => 404,
                'message' => 'not found parcel'
            ]);
        }
        $stt = $request->confirm;
        if ($stt == 0) {
            $incoming = $this->remove($incoming, $parcelid);
            $of->update([
                'outgoingToCustomer' => $incoming,
            ]);
            $parcel->update([
                'status' => "OK",
                // 'parcel' => $parcel
                
            ]);
            $pctrl = new ParcelController();
            $pctrl->addTrace($parcelid, "Giao thành công");
            
        } else {
            $incoming = $this->remove($incoming, $parcelid);
            $outgoing = $this->add($outgoing, $parcelid);
            $of->update([
                'outgoingToCustomer' => $incoming,
                'failed' => $outgoing
            ]);
            $parcel->update([
                'status' => "Hoàn lại kho",
                // 'parcel' => $parcel
            ]);
            $pctrl = new ParcelController();
            $pctrl->addTrace($parcelid, "Giao không thành công");
            return response() -> json([
                'out' => $outgoing,
                'message' => 'Giao không thành công'

            ]);
        }
    }

    
    
    public function find($jsonlist, int $value) {
        $arr = json_decode($jsonlist);
        array_push($arr, 0);
        $arr = array_reverse($arr);
        if (array_search($value, $arr)) {
            return true;
        } else {
            return false;

        }
    }

    public function remove($jsonlist, int $value) {
        $arr = json_decode($jsonlist);
        for ($i = 0; $i < sizeof($arr); $i++) {
            if ($arr[$i] == $value) {
                unset($arr[$i]);
                break;
            }
        } 
       
        return json_encode(array_values($arr));
    }

    public function add($jsonlist, int $value) {
        $arr = json_decode($jsonlist);
        array_push($arr, $value);

        return json_encode($arr);
    }
}
