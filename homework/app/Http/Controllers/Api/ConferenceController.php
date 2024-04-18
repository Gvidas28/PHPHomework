<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConferenceResource;
use App\Models\Conference;
use App\Http\Requests\StoreConferenceRequest;
use App\Http\Requests\UpdateConferenceRequest;

class ConferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conferences = Conference::all();
        return ConferenceResource::collection($conferences);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConferenceRequest $request)
    {
        $data = $request->validated();
        $conference = Conference::create($data);
        return new ConferenceResource($conference);
    }

    /**
     * Display the specified resource.
     */
    public function show(Conference $conference)
    {
        return new ConferenceResource($conference);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConferenceRequest $request, Conference $conference)
    {
        $data = $request->validated();
        $conference->update($data);
        return new ConferenceResource($conference);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conference $conference)
    {
        $conference->delete();
        return response('', 204);
    }
}
