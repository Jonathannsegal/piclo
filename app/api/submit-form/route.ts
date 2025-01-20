import { NextResponse } from "next/server";

// app/api/submit-form/route.ts
const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbzTObTjcYbb9obK6L_tazB7uuky1Y1NaKD8lwBd1QVCxnXwT42hfWD9KamlI9Ky6GZx6Q/exec";

export async function POST(request: Request) {
  try {
    // Log incoming request
    const body = await request.json();
    console.log("[API Route] Received data:", body);

    // Validate required fields based on step
    if (!body.email || !body.name || !body.phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          details: "Email, name, and phone are required",
        },
        { status: 400 }
      );
    }

    // Clean the data before sending
    const cleanedData = {
      ...body,
      location: body.location || "",
      isBetaTester: !!body.isBetaTester,
      // Convert number values to strings if they're 0
      culturalImportance: body.culturalImportance || "",
      purchaseLikelihood: body.purchaseLikelihood || "",
      freeTrialImportance: body.freeTrialImportance || "",
      techSavviness: body.techSavviness || "",
      uiIntuitiveness: body.uiIntuitiveness || "",
      // Ensure arrays are joined as strings
      travelMethod: Array.isArray(body.travelMethod)
        ? body.travelMethod.join(", ")
        : body.travelMethod,
      travelerType: Array.isArray(body.travelerType)
        ? body.travelerType.join(", ")
        : body.travelerType,
      destinationType: Array.isArray(body.destinationType)
        ? body.destinationType.join(", ")
        : body.destinationType,
      sharingMethod: Array.isArray(body.sharingMethod)
        ? body.sharingMethod.join(", ")
        : body.sharingMethod,
    };

    // Log request to Google Sheets
    console.log("[API Route] Sending request to:", GOOGLE_SHEETS_URL);
    console.log("[API Route] With data:", cleanedData);

    // Make request to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cleanedData),
    });

    // Log response details
    console.log("[API Route] Google Sheets response status:", response.status);
    console.log(
      "[API Route] Google Sheets response headers:",
      Object.fromEntries(response.headers.entries())
    );

    // Get response text and log it
    const responseText = await response.text();
    console.log("[API Route] Google Sheets raw response:", responseText);

    // Validate if we got any response
    if (!responseText) {
      console.error("[API Route] Empty response from Google Sheets");
      throw new Error("Empty response from Google Sheets");
    }

    // Parse and validate JSON response
    try {
      const jsonResponse = JSON.parse(responseText);
      console.log("[API Route] Parsed JSON response:", jsonResponse);

      if (jsonResponse.status === "error") {
        throw new Error(jsonResponse.message || "Error from Google Sheets");
      }

      return NextResponse.json({
        success: true,
        data: jsonResponse,
      });
    } catch (parseError) {
      console.error("[API Route] JSON parse error:", parseError);
      console.error("[API Route] Failed to parse response:", responseText);

      throw new Error(
        `Invalid JSON response from Google Sheets: ${responseText.substring(
          0,
          100
        )}...`
      );
    }
  } catch (error) {
    // Log the full error
    console.error("[API Route] Error:", error);

    // Determine if this is a network error
    const isNetworkError =
      error instanceof TypeError && error.message.includes("fetch failed");

    // Return appropriate error response
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit form",
        details: error instanceof Error ? error.message : "Unknown error",
        type: isNetworkError ? "network" : "processing",
        timestamp: new Date().toISOString(),
      },
      {
        status: isNetworkError ? 503 : 500,
      }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}
