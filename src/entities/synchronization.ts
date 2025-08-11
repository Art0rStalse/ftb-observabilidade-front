export interface ISynchronization {
    id: string;
    success: boolean;
    errorMessage: string | null;
    source: string;
    destination: string;
    connection: string;
    startedAt: string;
    finishedAt: string;
}