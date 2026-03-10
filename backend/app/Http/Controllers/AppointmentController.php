<?php

namespace App\Http\Controllers;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
class AppointmentController extends Controller
{
    // عرض كل المواعيد
    public function index()
    {
        $appointments = Appointment::orderBy('appointment_date', 'asc')
            ->orderBy('appointment_time', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $appointments
        ]);
    }

    // إنشاء موعد جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name'    => 'required|string|max:255',
            'phone'            => 'required|string|max:20',
            'car_type'         => 'required|string|max:255',
            'service_type'     => 'required|in:oil_change,filter_change,full_service',
            'appointment_date' => 'required|date|after_or_equal:today',
            'appointment_time' => 'required',
            'notes'            => 'nullable|string',
        ]);

        $appointment = Appointment::create($validated);
        Http::post('https://hakimsa.app.n8n.cloud/webhook/appointment-created', $validated);


        return response()->json([
            'success' => true,
            'message' => 'تم حجز موعدك بنجاح',
            'data'    => $appointment
        ], 201);
    }

    // عرض موعد محدد
    public function show(Appointment $appointment)
    {
        return response()->json([
            'success' => true,
            'data'    => $appointment
        ]);
    }

    // تحديث حالة الموعد
    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $appointment->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'تم تحديث الموعد',
            'data'    => $appointment
        ]);
    }

    // حذف موعد
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return response()->json([
            'success' => true,
            'message' => 'تم حذف الموعد'
        ]);
    }
}