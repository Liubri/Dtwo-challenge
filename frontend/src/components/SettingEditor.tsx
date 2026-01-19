import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function SettingEditor() {
    const { uid } = useParams();
    const navigate = useNavigate();
    const isEditing = !!uid;

    const [jsonInput, setJsonInput] = useState('{\n  "key": "value"\n}');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditing);

    useEffect(() => {
        if (isEditing) {
            async function fetchSetting() {
                try {
                    const response = await axios.get(`${API_URL}/settings/${uid}`);
                    setJsonInput(JSON.stringify(response.data.data, null, 2));
                } catch (err) {
                    setError('Failed to load setting details');
                    console.error(err);
                } finally {
                    setFetching(false);
                }
            }
            fetchSetting();
        }
    }, [uid, isEditing]);

    async function handleSave() {
        setLoading(true);
        setError(null);
        try {
            // Validate JSON
            let parsedData;
            try {
                parsedData = JSON.parse(jsonInput);
            } catch (e) {
                setError('Invalid JSON format');
                setLoading(false);
                return;
            }

            if (isEditing) {
                await axios.put(`${API_URL}/settings/${uid}`, parsedData);
            } else {
                await axios.post(`${API_URL}/settings`, parsedData);
            }
            navigate('/');
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Failed to save setting';
            setError(errorMessage);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (fetching) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="w-full p-4">
            <button
                onClick={() => navigate('/')}
                className="mb-4 text-gray-200 hover:text-purple-900 flex items-center gap-1"
            >
                <ArrowLeft size={20} /> Back to List
            </button>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    {isEditing ? 'Edit Setting' : 'Create New Setting'}
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        JSON Configuration
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                        Enter valid JSON data for your setting object.
                    </p>
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono h-64"
                        spellCheck="false"
                    />
                </div>

                <div className="flex items-center justify-end">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : (
                            <>
                                <Save size={20} /> Save Setting
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
