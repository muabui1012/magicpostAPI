<?php

namespace App\Http\Controllers\Api;

use App\Models\Parcel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Validator;

class ParcelController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['show', 'findByCode']]);
    }
    //get
    public function index() {
        $parcel = Parcel::all();
        if ($parcel->count() > 0) {
            return response()->json([
                'status' => 200,
                'parcel' => $parcel
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'massage' => "Not found"
            ], 404);
        }
    }

    //post
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            // 'officeID' => 'required',
            'senderName' => 'required|string',
            'senderPhone' => 'required|string',
            'senderAddress' => 'required|string',
            // 'sendOfficeID' => 'required',
            // 'receiverName' => 'required',
            // 'receiverPhone'=> 'required',
            // 'receiverAddress'=> 'required',
            // 'receivOfficeID' => 'required',
            // 'trace' => 'required',
            // 'status'=> 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
                $officeID = isset($request->officeID) ? $request->officeID : 0;
                $senderName= isset($request->senderName) ? $request->senderName : "null";
                $senderPhone = isset($request->senderPhone) ? $request->senderPhone : "null";
                $senderAddress = isset($request->senderAddress) ? $request->senderAddress : "null";
                //$sendOfficeID = isset($request->sendOfficeID) ? $request->sendOfficeID : 0;
                $receiverName = isset($request->recieverName) ? $request->recieverName : "null";
                $receiverPhone = isset($request->recieverPhone) ? $request->recieverPhone : "null";
                $receiverAddress = isset($request->recieverAddress) ? $request->recieverAddress : "null";
                $receiveOfficeID = isset($request->receiveOfficeID) ? $request->receiveOfficeID : 0;
                $trace = isset($request->trace) ? $request->trace : "null";
                $status= isset($request->status) ? $request->status : "null";
                $uctrl = new UserController();
                $usr= $uctrl->getUser($request);
                $sendOfficeID = $usr->departmentid;
                $parcel = Parcel::create([
                // 'officeID' => $officeID,
                'senderName' => $senderName,
                'senderPhone' => $senderPhone,
                'senderAddress' => $senderAddress,
                'sendOfficeID'=> $sendOfficeID,
                'recveirName' => $receiverName,
                'receiverPhone' => $receiverPhone,
                'receiverAddress' => $receiverAddress,
                'receiveOfficeID' => $receiveOfficeID,
                'trace' => $trace,
                'status' => $status
            ]);

            if ($parcel) {
                $id = $parcel->id;
                $usrctrl = new UserController();
                $sendOfficeID = $usrctrl->getUserOfficeID($request);
                $code = "MGP_" . $sendOfficeID . "_" . $receiveOfficeID .  "_" . $id;
                
                $ofc = new OfficeController();
                $ofc -> addToIncomingFromCustomer($sendOfficeID, $id);
                $parcel -> update([
                    'code' => $code
                ]);
                $msg =  "Parcel created successfully";
                return response()->json([
                    'status' => 200, 
                    'message' => $msg,
                    'code' => $code

                ], 200);
            } else {
                return response()->json([
                    'status' => 500, 
                    'message' => "Smth went wrong"
                ], 500);
            }
        }
    }

    //get by id
    public function show($id) {
        $parcel = Parcel::find($id);
        if ($parcel) {
            return response()->json([
                'status' => 200,
                'parcel' => $parcel
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'massage' => "Not found"
            ], 404);
        }
    }



    //update
    public function update(Request $request, int $id) {
        $validator = Validator::make($request->all(), [
            // 'officeID' => 'required',
            // 'senderName' => 'required',
            // 'senderPhone' => 'required',
            // 'senderAddress' => 'required',
            // 'sendOfficeID' => 'required',
            // 'receiverName' => 'required',
            // 'receiverPhone'=> 'required',
            // 'receiverAddress'=> 'required',
            // 'receivOfficeID' => 'required',
            // 'trace' => 'required',
            // 'status'=> 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
                $backup = Parcel::find($id);
                $officeID = isset($request->officeID) ? $request->officeID : $backup->officeID;
                $senderName= isset($request->senderName) ? $request->senderName : $backup->senderName;
                $senderPhone = isset($request->senderPhone) ? $request->senderPhone : $backup->senderPhone;
                $senderAddress = isset($request->senderAddress) ? $request->senderAddress : $backup->senderAddress;
                $sendOfficeID = isset($request->sendOfficeID) ? $request->sendOfficeID : $backup->sendOfficeID;
                $recieverName = isset($request->recieverName) ? $request->recieverName : $backup->recieverName;
                $recieverPhone = isset($request->recieverPhone) ? $request->recieverPhone : $backup->recieverPhone;
                $recieverAddress = isset($request->recieverAddress) ? $request->recieverAddress : $backup->recieverAddress;
                $receiveOfficeID = isset($request->receiveOfficeID) ? $request->recieveOfficeID : 0;
                $trace = isset($request->trace) ? $request->trace : $backup->trace;
                $status= isset($request->status) ? $request->status : $backup->status;

                $parcel = Parcel::find($id);
                $parcel -> update([
                'officeID' => $officeID,
                'senderName' => $senderName,
                'senderPhone' => $senderPhone,
                'senderAddress' => $senderAddress,
                'sendOfficeID'=> $sendOfficeID,
                'recieverName' => $recieverName,
                'recieverPhone' => $recieverPhone,
                'recieverAddress' => $recieverAddress,
                'recievOfficeID' => $receiveOfficeID,
                'trace' => $trace,
                'status' => $status
            ]);

            if ($parcel) {
                return response()->json([
                    'status' => 200, 
                    'message' => "Parcel edited successfully"
                ], 200);
            } else {
                return response()->json([
                    'status' => 404, 
                    'message' => "Smth went wrong"
                ], 404);
            }
        }
    }

    //del
    public function destroy($id) {
        $parcel = Parcel::find($id);
        if ($parcel) {
            $parcel->delete();
            return response()->json([
                'status' => 200, 
                'message' => "Parcel deleted successfully"
            ], 200);
        } else {
            return response()->json([
                'status' => 404, 
                'message' => "Smth went wrong"
            ], 404);
        }

    }

    //Tra cứu 
    public function findByCode($code) {
        $code = strval($code);
        $parcel = Parcel::where('code', $code)->first();
        if ($parcel) {
            return response()->json([
                'status' => 200,
                'parcel' => $parcel,
                'code' => $code
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Not found",
                'code' => $code
            ], 404);
        }
    }



}
