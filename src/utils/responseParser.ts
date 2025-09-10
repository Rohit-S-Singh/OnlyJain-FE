/* istanbul ignore file */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
  // isData: boolean;
}

// Handles dynamic API response and nested key extraction
export const parseApiResponse = <T>(response: any, dataKey?: string): T => {
  const res: ApiResponse<any> = response.data;

  try {
    debugger
    if (res.success) {
      if (dataKey) {
        if (res.data && res.data[0][dataKey]) {
          return res.data[0][dataKey] as T;
        } else {
          throw new Error(`Missing expected data key: ${dataKey}`);
        }
      } else {
        return res.data as T; // direct return if no key
      }
    }
  } catch (error) {
    throw new Error('Something went wrong');
  }

  throw new Error(res.message || 'Something went wrong');
};

export const handleApiThunk = async <T>(
  apiCall: () => Promise<any>,
  dataKey: string | undefined,
  rejectWithValue: (value: string) => any
): Promise<T | any> => {
  try {
    const response = await apiCall();
    return parseApiResponse<T>(response, dataKey);
  } catch (error: any) {
    const errorMessage = error?.message || 'Unexpected error';
    return rejectWithValue(errorMessage);
  }
};
