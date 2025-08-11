"use server";
import 'server-only';

export async function listAllSynchronization() {
    const url = `${process.env.API_URL}/synchronization/`;

    console.log(`Fetching ${url}`);

    const response = await fetch(url,
        { method: "GET" });

    return await response.json();
}