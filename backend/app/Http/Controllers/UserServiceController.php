<?php

namespace App\Http\Controllers;

use App\Models\SelectedService;
use App\Models\ServiceName;
use App\Models\UnselectedService;
use App\Models\User;
use App\Models\UserTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserServiceController extends Controller
{
    public function store(Request $request)
    {
        $user_id = $request->user_id;
        $service_id = $request->service_id;
        $selected = $request->selected;

        // Update or create entry in UserTable
        $userService = UserTable::updateOrCreate(
            ['user_id' => $user_id, 'service_id' => $service_id],
            ['selected' => $selected]
        );

        if ($selected) {
            // Add to selected_services table
            SelectedService::updateOrCreate(
                ['user_id' => $user_id, 'service_id' => $service_id]
            );

            // Remove from unselected_services table
            UnselectedService::where('user_id', $user_id)
                ->where('service_id', $service_id)
                ->delete();
        } else {
            // Add to unselected_services table
            UnselectedService::updateOrCreate(
                ['user_id' => $user_id, 'service_id' => $service_id]
            );

            // Remove from selected_services table
            SelectedService::where('user_id', $user_id)
                ->where('service_id', $service_id)
                ->delete();
        }

        // Ensure that users with no selected services are in unselected_services
        $this->updateUnselectedServices();

        return response()->json($userService);
    }

    public function index()
    {
        $userServices = UserTable::with(['user', 'service'])->get();
        return response()->json($userServices);
    }

    private function updateUnselectedServices()
    {
        $allUsers = User::all();
        $services = ServiceName::all();

        foreach ($allUsers as $user) {
            $selectedServicesCount = UserTable::where('user_id', $user->id)
                ->where('selected', 1)
                ->count();

            if ($selectedServicesCount === 0) {
                foreach ($services as $service) {
                    UnselectedService::updateOrCreate(
                        ['user_id' => $user->id, 'service_id' => $service->id]
                    );
                }
            }
        }
    }

    public function getSelectedServices()
    {
        $selectedServices = SelectedService::with('user', 'service')->get();
        return response()->json($selectedServices);
    }

    public function getUnselectedServices()
    {
        $unselectedServices = UnselectedService::with('user', 'service')->get();
        return response()->json($unselectedServices);
    }

    public function getMatchingServices()
    {
        // Get all selected and unselected services
        $selectedServices = SelectedService::pluck('service_id')->toArray();
        $unselectedServices = UnselectedService::pluck('service_id')->toArray();

        // Find matching services between selected and unselected services
        $matchedServices = array_intersect($selectedServices, $unselectedServices);

        // Get the service names for matched services
        $matchedServiceNames = ServiceName::whereIn('id', $matchedServices)->pluck('service_name')->toArray();

        return response()->json($matchedServiceNames);
    }
}
