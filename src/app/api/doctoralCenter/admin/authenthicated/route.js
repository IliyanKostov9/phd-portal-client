import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const reqHeaders = await headers();
    const accessToken = reqHeaders.get("authorization");
    const cookie = reqHeaders.get("Cookie");

    const res = await fetch(
      `${process.env.BASE_URL}/doctoralcenter/authenticated/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          Cookie: cookie
        }
      }
    );
    const data = await res.json();
    console.log(
      `Fetching authenthicated users response: ${JSON.stringify(data)}`
    );

    const response = NextResponse.json(data, {
      status: res.status
    });

    if (response.status > 400 && response.status < 600) {
      return NextResponse.json(
        { error: data.data.message },
        { status: response.status }
      );
    }

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const reqHeaders = await headers();
    const accessToken = reqHeaders.get("authorization");

    const body = await request.json();
    const cookie = reqHeaders.get("Cookie");

    const res = await fetch(
      `${process.env.BASE_URL}/doctoralcenter/authenticated/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          Cookie: cookie
        },

        body: JSON.stringify(body)
      }
    );
    const data = await res.json();
    console.log(`Fetching delete response: ${JSON.stringify(data)}`);

    const response = NextResponse.json(data, {
      status: res.status
    });

    if (response.status > 400 && response.status < 600) {
      return NextResponse.json(
        { error: data.data.message },
        { status: response.status }
      );
    }

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server error!" }, { status: 500 });
  }
}
