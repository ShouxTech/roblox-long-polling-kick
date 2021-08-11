local HttpService = game:GetService('HttpService');
local Players = game:GetService('Players');

local URL = 'https://scratched-stingy-partridge.glitch.me/fetchKickRequests';

local function HandleKickRequest(username)
	local plrToKick = Players:FindFirstChild(username);
	if not plrToKick then return; end;
	
	plrToKick:Kick();
end;

while true do
	local suc, JSONData = pcall(HttpService.GetAsync, HttpService, URL);
	if suc then
		local suc, data = pcall(HttpService.JSONDecode, HttpService, JSONData);
		if suc then
			local usernameOfPlayerToKick = data.username;
			if usernameOfPlayerToKick then
				HandleKickRequest(usernameOfPlayerToKick);
			end;
		end;
	end;

	task.wait(1);
end;
