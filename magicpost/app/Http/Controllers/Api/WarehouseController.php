<?php

namespace App\Http\Controllers\api;

use App\Models\Office;
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
        $this_wh = Warehouse::where('officeid', $officeID)->first();
        // return response()->json([
        //     'message' => $this_wh
        // ]);
        $jsonlist = $this_wh->incomingFromOffice;
        $arr = json_decode($jsonlist);
        array_push($arr, $parcelID);
        $jsonarr = json_encode($arr);
        $this_wh->update([
            'incomingFromOffice' => $jsonarr
        ]);
        if ($this_wh) {
            $msg = "Gửi đến kho " . $this_wh->id;
            $pctrl = new ParcelController();
            $pctrl->addTrace($parcelID, $msg);
            return true;
        }
        return false;
    }

    public function removeOutgoingToOffice(int $whID, int $parcelid) {
        $wh = Warehouse::find($whID);
        $jsonlist = $wh->outgoingToOffice;
        $arr = json_decode($jsonlist);
        foreach (array_keys($arr, $parcelid) as $key) {
            unset($arr[$key]);
        }
        $jsonarr = json_encode(array_values($arr));
        $wh->update([
            'outgoingToOffice' => $jsonarr
        ]);
    }

    

    public function sendToOffice(Request $request) {
        $parcelid = intval($request->id);
        $usrctrl = new UserController();
        $user = $usrctrl->getUser($request);
        $userdetail = $usrctrl->getUserDetail($request);
        $whid = $userdetail->departmentid;
        $wh = Warehouse::where('id', $whid)->first();
        $outgoingtoOF = $wh->outgoingToOffice;
        // return response()-> json([
        //     'list' => $outgoingtoOF,
        //     'pid' => $parcelid,
        //     'jlist' => json_decode($outgoingtoOF),
        //     'office' => $this->find($outgoingtoOF, $parcelid),
        //     'user' => $wh
        // ]);
        if (!$this->find($outgoingtoOF, $parcelid)) {
            return response()->json([
                "message" => "not found parcel"
            ]);
        } else {
            $ofid = $wh->officeid;
            $ofid = $userdetail->departmentid;
            $of = Office::where('id', $ofid)->first();
            $ofc = new OfficeController();
            //$ofc->addToIncomingFromWarehouse($ofid, $parcelid);
            $jsonlist = $of->incomingFromWarehouse;
            $arr = json_decode($jsonlist);
            array_push($arr, $parcelid);
            $jsonarr = json_encode($arr);
            $of->update([
                'incomingFromWarehouse' => $jsonarr
            ]);

            //$status = $this->remove($outgoingtoOF, $parcelid);
            $wh->update([
                'outgoingToOffice' => $this->remove($outgoingtoOF, $parcelid)
            ]);
            
            $msg = "Gửi đến PGD " . $ofid;
            $pctrl = new ParcelController();
            $pctrl->addTrace($parcelid, $msg);
            return response()-> json([
                'office' => $of
            ]);
        }
        
        //$of = Office::where('id', $ofid)->first();





        // $parcelid = $request->id;
        // $usrctrl = new UserController();
        // $user = $usrctrl->getUser($request);
        // $userdetail = $usrctrl->getUserDetail($request);
        // if ($userdetail->department_type == "warehouse"|| true) {
        //     $id = $userdetail->departmentid;
        //     $wh = Warehouse::where('id', $id)->first();
        //     if (!$wh) {
        //         return response() -> json([
        //             'message' => "Not found your warehouse",
        //             'id' => $id,
        //             'user' => $user,
        //             '$wh' => $wh
        //         ]);
        //     } else {
        //         // return response() -> json([
        //         //     'id' => $id,
        //         //     'user' => $user,
        //         //     '$wh' => $wh
        //         // ]);

        //         $list = $wh->outgoingToOffice;
        //         $officeID = $wh->officeid;
        //         $cF = new commonFunctions();
        //         if (!($cF->findJsonList($list, $parcelid)) && false) {
        //             return response() -> json([
        //                 'message' => "Not found parcel"
        //             ], 404);
        //         } else {
        //             // return response() -> json([
        //             //     'message' => $wh
        //             // ], 404);

        //             $ofc = new OfficeController();
        //             $status = $ofc -> addToOutgoingToCustomer($officeID, $parcelid);
        //             if ($status) {
        //                 $wh->update([
        //                     //'outgoingToOffice' => $cF->removeFromJsonList($wh->outgoingToOffice, $parcelid)
        //                 ]);
        //                 if ($wh) {
        //                     return response() -> json([
        //                         'message' => "sended successfully"
        //                     ], 200);
        //                 } else {
        //                     return response() -> json([
        //                         'message' => "send unsuccesfully"
        //                     ], 500);
        //                 }
        //                 // $wh->outgoingToOffice => $cF->removeFromJsonList($wh->outgoingToOffice, $parcelid);
        //                 // return response() -> json([
        //                 //     'message' => "Not found your warehouse"
        //                 // ]);
        //             }
        //         }
        //     }

        // }

    }

    public function sendToOtherWarehouse(Request $request) {
        $usrctrl = new UserController();
        $userdetail = $usrctrl->getUserDetail($request);
        $sender_whid = $userdetail->departmentid;
        $sender_wh = Warehouse::where('id', $sender_whid)->first();
        if (!$sender_wh) {
            return response()->json([
                'message' => "not found send warehouse"
            ]);
        }
        $parcel_id = $request->id;
        $parcel = Parcel::where('id', $parcel_id)->first();
        if (!$parcel) {
            return response()->json([
                'message' => "not found parcel"
            ]);
        } 
        $receiveOffice_id = $parcel->receiveOfficeID;
        $receive_wh = Warehouse::where('officeid', $receiveOffice_id)->first();
        if (!$receive_wh) {
            return response()->json([
                'message' => "not found receive warehouse"
            ]);
        }
        $send = $sender_wh->incomingFromOffice;
        $rece = $receive_wh->incomingFromOtherWarehouse;
        
        if (!$this->find($send, $parcel_id)) {
            return response()->json([
                'message' => "not found parcel in warehouse"
            ]);
        } 

        $rece = $this->add($rece, $parcel_id);
        $send = $this->remove($send, $parcel_id);

        $sender_wh->update([
            'incomingFromOffice' => $send
        ]);

        $receive_wh->update([
            'incomingFromOtherWarehouse' => $rece
        ]);
        
        $msg = "Chuyển đến kho " . $receive_wh->id;
        $pctrl = new ParcelController();
        $pctrl->addTrace($parcel_id, $msg);

        return response()->json([
            'message' => "Sended to next warehouse successfully"
        ]);

    }

    public function prepareToOffice(Request $request) {
        $parcelid = $request->id;
        $usrctrl = new UserController();
        $userdetail = $usrctrl->getUserDetail($request);
        $whid = $userdetail->departmentid;
        $wh = Warehouse::where('id', $whid)->first();
        $incoming = $wh->incomingFromOtherWarehouse;
        $outgoing = $wh->outgoingToOffice;
        if (!$this->find($incoming, $parcelid)) {
            return response() -> json([
                'status' => $whid,
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
        $wh -> update([
            'incomingFromOtherWarehouse' => $incoming,
            'outgoingToOffice' => $outgoing
        ]);
        //$parcel:
        //$this->removeIncomingWarehouse($officeID, $parcelid);
        //$status = $this->addToOutgoingToCustomer($officeID, $parcelid);
        if ($wh) {
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

    public function getIncomingFromOffice(Request $request) {
        //$id = $request->id;
        $usrctrl = new UserController();
        $id = $usrctrl->getUserDetail($request)->departmentid;
        $wh = Warehouse::find($id);
        $jsonlist = $wh->incomingFromOffice;
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

    public function getOutgoingToOffice(Request $request) {
        //$id = $request->id;
        $usrctrl = new UserController();
        $id = $usrctrl->getUserDetail($request)->departmentid;
        $wh = Warehouse::find($id);
        $jsonlist = $wh->outgoingToOffice;
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

    public function getIncomingFromOtherWarehouse(Request $request) {
        //$id = $request->id;
        $usrctrl = new UserController();
        $id = $usrctrl->getUserDetail($request)->departmentid;
        $wh = Warehouse::find($id);
        $jsonlist = $wh->incomingFromOtherWarehouse;
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

    public function getOutgoinToOtherWarehouse(Request $request) {
        //$id = $request->id;
        $usrctrl = new UserController();
        $id = $usrctrl->getUserDetail($request)->departmentid;
        $wh = Warehouse::find($id);
        $jsonlist = $wh->outgoingToIOtherWarehouse;
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

    public function getStatistic(Request $request) {
        $usrctrl = new UserController();
        $whid = $usrctrl->getUserDetail($request)->departmentid;
        //$parcelid = intval($request->id);
        $wh = Warehouse::where('id', $whid)->first();
        // return response()->json([
        //     'arr' => $wh
        // ], 200);
        $send = $wh->incomingFromOffice;
        $sendarr = json_decode($send);
        $countsend = !$sendarr ? 0 : count($sendarr, COUNT_NORMAL);
        $recv = $wh->outgoingToOffice;
        $recvarr = json_decode($recv);
        $countrecv = !$recvarr ? 0 : count($recvarr, COUNT_NORMAL);
        $ship = $wh->incomingFromOtherWarehouser;
        $shiparr = json_decode($ship);
        $countship = !$shiparr? 0 : count($shiparr, COUNT_NORMAL);
        // $failed = $wh->failed;
        // $farr = json_decode($failed);
        // if (!$farr) {
        //     $countfailed = 0;
        // } else {
        //     $countfailed = count($farr, COUNT_NORMAL);
        // }
        return response()->json([
            'id' => $whid,
            'sendedToNextWarehouse' => $countsend,
            'sendedToOffice' => $countrecv,
            'receive from warehouse' => $countship,
            //'failed' => $countfailed

        ]);

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
