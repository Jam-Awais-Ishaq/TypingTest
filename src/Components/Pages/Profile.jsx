import React, { useState } from 'react';
const Profile = () => {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        address: '123 Main Street, City',
        bio: 'Software developer with passion for coding.'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSaveProfile = () => {
        console.log('Profile saved:', profile);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    return (
        <div className=" p-3 mt-4">
        
            <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                {!isEditing && (
                    <button
                        onClick={handleEditProfile}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="space-y-2">
                {isEditing ? (
                    <div className="space-y-2">
                    
                        <div className='md:flex justify-between gap-2'>
                            <div className='md:w-[50%]'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className='md:w-[50%]'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className='md:flex gap-2 justify-between'>
                            <div className='md:w-[50%]'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleInputChange}
                                    className="w-[100%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div className='md:w-[50%]'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={profile.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your address"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleInputChange}
                                rows="2"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={handleSaveProfile}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition duration-200"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className=" space-y-1 w-[100%] p-2">
                        <div className="flex items-center w-full">
                            <div className="w-17 h-17 bg-blue-500 mr-1 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {profile.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
                                <p className="text-gray-600">{profile.email}</p>
                            </div>
                        </div>

                        <div className="md:flex">
                            <div className="space-y-6 md:w-[50%] w-full">
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Phone</span>
                                    <p className="text-gray-800">{profile.phone}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Address</span>
                                    <p className="text-gray-800">{profile.address}</p>
                                </div>
                            </div>

                            <div className='md:w-[50%] w-full mt-6'>
                                <span className="text-sm font-medium text-gray-500">Bio</span>
                                <p className="text-gray-800 mt-1">{profile.bio}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Profile;