function varargout = chall5knn(varargin)
gui_Singleton = 1;
gui_State = struct('gui_Name',       mfilename, ...
                   'gui_Singleton',  gui_Singleton, ...
                   'gui_OpeningFcn', @chall5knn_OpeningFcn, ...
                   'gui_OutputFcn',  @chall5knn_OutputFcn, ...
                   'gui_LayoutFcn',  [] , ...
                   'gui_Callback',   []);
if nargin && ischar(varargin{1})
    gui_State.gui_Callback = str2func(varargin{1});
end

if nargout
    [varargout{1:nargout}] = gui_mainfcn(gui_State, varargin{:});
else
    gui_mainfcn(gui_State, varargin{:});
end
end
function chall5knn_OpeningFcn(hObject, ~, handles, varargin)
handles.output = hObject;
guidata(hObject, handles);
end
function varargout = chall5knn_OutputFcn(hObject, eventdata, handles)
varargout{1} = handles.output;
end
function go_Callback(hObject, eventdata, handles)
    
X = csvread('KNN_table.csv', 0, 0, [0,0,20,5]);
Y = csvread('KNN_table.csv', 0, 6, [0,6,20,6]);

Mdl = fitcknn(X,Y,'NumNeighbors',1)

while 1<3
    Loc = csvread('C:\Users\Deepshikha\Desktop\challenge5\KNN_table1')
    
    val = predict(Mdl, Loc)
    
    if val == 1
        set(handles.sector1,'BackgroundColor','green');
    else
        set(handles.sector1,'BackgroundColor','red');
    end
    
    if val == 2
        set(handles.sector2,'BackgroundColor','green');
    else
        set(handles.sector2,'BackgroundColor','red');
    end
     
    if val == 3
        set(handles.sector3,'BackgroundColor','green');
    else
        set(handles.sector3,'BackgroundColor','red');
    end
    
    if val == 4
        set(handles.sector4,'BackgroundColor','green');
    else
        set(handles.sector4,'BackgroundColor','red');
    end
    
    if val == 5
        set(handles.sector5,'BackgroundColor','green');
    else
        set(handles.sector5,'BackgroundColor','red');
    end
    
    if val == 6
        set(handles.sector6,'BackgroundColor','green');
    else
        set(handles.sector6,'BackgroundColor','red');
    end
    
    if val == 7
        set(handles.sector7,'BackgroundColor','green');
    else
        set(handles.sector7,'BackgroundColor','red');
    end
    
    if val == 8
        set(handles.sector8,'BackgroundColor','green');
    else
        set(handles.sector8,'BackgroundColor','red');
    end
    
    if val == 9
        set(handles.sector9,'BackgroundColor','green');
    else
        set(handles.sector9,'BackgroundColor','red');
    end
    
    if val == 10
        set(handles.sector10,'BackgroundColor','green');
    else
        set(handles.sector10,'BackgroundColor','red');
    end
    
    if val == 11
        set(handles.sector11,'BackgroundColor','green');
    else
        set(handles.sector11,'BackgroundColor','red');
    end
    
    if val == 12
        set(handles.sector12,'BackgroundColor','green');
    else
        set(handles.sector12,'BackgroundColor','red');
    end
    pause(5)
end
end
