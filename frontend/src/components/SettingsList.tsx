import { Trash2, Edit } from 'lucide-react';

export default function SettingsList({ settings, handleDelete, navigate }: any) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Preview</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {settings.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                        No settings found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                settings.map((setting: any) => (
                                    <tr key={setting.uid} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                                            {setting.uid.substring(0, 10)}...
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 max-w-md truncate">
                                            {JSON.stringify(setting.data)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(setting.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => navigate(`/edit/${setting.uid}`)}
                                                className="text-indigo-200 hover:text-indigo-700 mr-4 inline-flex items-center gap-1"
                                            >
                                                <Edit size={16} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(setting.uid)}
                                                className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
    );
}